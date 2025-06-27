from app.services.qa_service import QAService 

def main():
    qa = QAService()
    print("Device set to use CPU")
    while True:
        try:
            question = input("\nYour question: ")
            if not question.strip():
                print("Question cannot be empty.")
                continue

            print("Processing...")
            result = qa.answer_question(question)
            print(f"Answer: {result['answer']}")
        except KeyboardInterrupt:
            print("\nExiting.")
            break

if __name__ == "__main__":
    main()
