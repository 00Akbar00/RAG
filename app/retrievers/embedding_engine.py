# import numpy as np
# from sentence_transformers import SentenceTransformer
# from sklearn.metrics.pairwise import cosine_similarity

# class EmbeddingEngine:
#     def __init__(self, model_name: str = 'all-MiniLM-L6-v2'):
#         self.model = SentenceTransformer(model_name)

#     def embed(self, texts, convert_to_tensor=True):
#         return self.model.encode(texts, convert_to_tensor=convert_to_tensor)

#     def most_similar(self, query, embeddings, top_k=3):
#         query_embedding = self.embed(query, convert_to_tensor=True)
#         similarities = cosine_similarity(query_embedding.cpu().numpy().reshape(1, -1), embeddings.cpu().numpy())
#         top_indices = np.argsort(similarities[0])[::-1][:top_k]
#         return top_indices


# In embedding_engine.py

import numpy as np
from sentence_transformers import SentenceTransformer
import faiss  # Import faiss

class EmbeddingEngine:
    def __init__(self, model_name: str = 'all-MiniLM-L6-v2'):
        self.model = SentenceTransformer(model_name)
        self.index = None
        self.chunks = []

    def build_index(self, chunks: list):
        """Builds a FAISS index from a list of text chunks."""
        print("Embedding chunks and building FAISS index...")
        self.chunks = chunks
        embeddings = self.embed(texts=self.chunks, convert_to_tensor=False) # Get numpy arrays
        
        # Create a FAISS index
        d = embeddings.shape[1]  # Dimension of the vectors
        self.index = faiss.IndexFlatL2(d)  # Using L2 distance, which works well
        self.index.add(embeddings.astype('float32')) # Add vectors to the index
        print("Index built successfully.")

    def embed(self, texts, convert_to_tensor=False): # Changed default to False
        return self.model.encode(texts, convert_to_tensor=convert_to_tensor)

    def search(self, query: str, top_k: int = 3) -> list:
        """Searches the FAISS index for the most similar chunks."""
        if self.index is None:
            raise RuntimeError("Index has not been built. Please call build_index() first.")
        
        query_embedding = self.embed(texts=query)
        query_embedding = np.array([query_embedding]).astype('float32') # FAISS expects a 2D array
        
        distances, indices = self.index.search(query_embedding, top_k)
        
        # Return the actual chunks based on the retrieved indices
        return [self.chunks[i] for i in indices[0]]