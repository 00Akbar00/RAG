import requests
import json
from app.retrievers.context_retriever import ContextRetriever

class QAService:
    def __init__(self):
        self.retriever = ContextRetriever()

        # Directly specify the host and model here
        self.ollama_host = "http://host.docker.internal:11434"
        self.ollama_model = "llama3:8b"

        print(f"Connecting to Ollama at {self.ollama_host} with model {self.ollama_model}")

    def answer_question(self, question: str) -> dict:
        if not question.strip():
            return {"error": "Question cannot be empty."}

        # 1. Retrieve relevant context from your documents
        context = self.retriever.get_relevant_context(question)

        # 2. Create a prompt for the Ollama model
        prompt = f"""
        Answer the following question based only on the context provided.

        Context:
        {context}

        Question:
        {question}
        """

        # 3. Send the prompt to the Ollama API
        try:
            response = requests.post(
                f"{self.ollama_host}/api/generate",
                json={
                    "model": self.ollama_model,
                    "prompt": prompt,
                    "stream": False
                }
            )
            response.raise_for_status()

            full_response = response.json()

            return {
                "question": question,
                "answer": full_response.get("response", "No response field in reply")
            }

        except requests.exceptions.RequestException as e:
            print(f"Error connecting to Ollama: {e}")
            return {"error": "Could not connect to the Ollama service."}
