import pickle
import os
from transformers import AutoTokenizer

# --- Path Correction Logic (This should already be correct) ---
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(os.path.dirname(SCRIPT_DIR))
ENGINE_FILE_PATH = os.path.join(PROJECT_ROOT, 'retriever_engine.pkl')

class ContextRetriever:
    def __init__(self, engine_path=ENGINE_FILE_PATH):
        print(f"Loading retriever engine from: {engine_path}")
        try:
            with open(engine_path, "rb") as f:
                self.embedding_engine = pickle.load(f)
            # Initialize a tokenizer to count tokens accurately
            self.tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-small")
            print("Engine and tokenizer loaded successfully.")
        except FileNotFoundError:
            print(f"ERROR: Engine file not found at {engine_path}.")
            print("Please run the 'build_index.py' script first to create it.")
            raise

    def get_relevant_context(self, query: str, top_k: int = 5) -> str:
        """
        Retrieves relevant context, dynamically building the context string
        to respect the model's token limit.
        """
        if "summarize" in query.lower() or "list all" in query.lower():
            print("Summarization query detected. Retrieving more context candidates.")
            top_k = 15 # Retrieve a larger pool of candidates to choose from

        candidate_chunks = self.embedding_engine.search(query, top_k=top_k)

        # --- REVISED LOGIC: Build context efficiently and safely ---
        final_context = []
        total_tokens = 0
        # Set a buffer below the model's 512 token limit
        max_tokens = 400 
        
        for chunk in candidate_chunks:
            # Tokenize the chunk to find its length
            chunk_token_count = len(self.tokenizer.encode(chunk))
            
            # Check if adding the next chunk exceeds the token limit
            if total_tokens + chunk_token_count <= max_tokens:
                final_context.append(chunk)
                total_tokens += chunk_token_count
            else:
                # Stop if we hit the limit to avoid truncation
                break
                
        # print(f"Built context with {len(final_context)} chunks and {total_tokens} tokens.")
        return " ".join(final_context)