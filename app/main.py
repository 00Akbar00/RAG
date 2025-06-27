# app/main.py

from fastapi import FastAPI, Query
from transformers import pipeline
from context.data_loader import ContextRetriever

app = FastAPI()

# Initialize retriever and model at startup
retriever = ContextRetriever()
qa_model = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

@app.get("/")
def home():
    return {"message": "Ask a question about World Bank projects"}

@app.get("/ask/")
def ask_question(q: str = Query(...)):
    print("Received question:", q)
    context = retriever.get_relevant_context(q)
    result = qa_model(question=q, context=context)
    print("Generated answer:", result)
    return {"question": q, "answer": result["answer"]}
