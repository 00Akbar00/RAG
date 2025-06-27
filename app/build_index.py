# import pickle
# from app.retrievers.data_loader import ProjectDataLoader
# from app.retrievers.chunk_builder import ProjectChunkBuilder
# from app.retrievers.embedding_engine import EmbeddingEngine

# def main():
#     print("Starting the indexing process...")

#     # 1. Load Data
#     data_loader = ProjectDataLoader()
#     df = data_loader.load_and_clean()

#     # 2. Build Chunks
#     chunks = ProjectChunkBuilder.build_chunks(df)

#     # 3. Build and Save the Index
#     embedding_engine = EmbeddingEngine()
#     embedding_engine.build_index(chunks)

#     # 4. Save the configured engine (with the index and chunks) to a file
#     with open("retriever_engine.pkl", "wb") as f:
#         pickle.dump(embedding_engine, f)

#     print("Indexing complete. Engine saved to retriever_engine.pkl")

# if __name__ == "__main__":
#     main()

import pickle
import os
from app.retrievers.data_loader import DocumentLoader
from app.retrievers.chunk_builder import DocumentChunkBuilder
from app.retrievers.embedding_engine import EmbeddingEngine

# --- NEW: Define the directory where you will store your documents ---
# Create this directory and place your PDF/DOCX files inside it.
DOCUMENTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'documents')


def main():
    print("Starting the indexing process for documents...")

    # 1. Load Documents
    # Make sure the DOCUMENTS_DIR exists
    if not os.path.exists(DOCUMENTS_DIR):
        os.makedirs(DOCUMENTS_DIR)
        print(f"Created directory: {DOCUMENTS_DIR}")
        print("Please add your PDF and DOCX files to this directory and run again.")
        return
        
    loader = DocumentLoader(directory_path=DOCUMENTS_DIR)
    documents = loader.load_documents()

    # 2. Build Chunks
    chunk_builder = DocumentChunkBuilder()
    chunks = chunk_builder.build_chunks(documents)
    
    if not chunks:
        print("No chunks were created. Please ensure your documents are in the directory and are not empty.")
        return

    # 3. Build and Save the Index
    embedding_engine = EmbeddingEngine()
    embedding_engine.build_index(chunks)

    # 4. Save the configured engine to a file
    with open("retriever_engine.pkl", "wb") as f:
        pickle.dump(embedding_engine, f)

    print("\nIndexing complete. Engine saved to retriever_engine.pkl")

if __name__ == "__main__":
    main()