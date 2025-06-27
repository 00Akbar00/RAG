# class ProjectChunkBuilder:
#     @staticmethod
#     def build_chunks(df):
#         chunks = []
#         for _, row in df.iterrows():
#             sentence = (
#                 f"The project '{row['project_name']}' in {row['countryshortname']} "
#                 f"(Region: {row['regionname']}) has the status '{row['status']}' "
#                 f"and is implemented by {row['impagency']}. "
#                 f"Objective: {row['pdo']}."
#             )
#             chunks.append(sentence)
#         return chunks


from langchain.text_splitter import RecursiveCharacterTextSplitter

class DocumentChunkBuilder:
    def __init__(self, chunk_size=1000, chunk_overlap=150):
        """
        Initializes the text splitter.
        chunk_size: The number of characters in each chunk.
        chunk_overlap: The number of characters to overlap between chunks to maintain context.
        """
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len
        )

    def build_chunks(self, documents: list) -> list:
        """
        Splits the content of each document into chunks.
        """
        all_chunks = []
        print("Building chunks from documents...")
        for doc in documents:
            # Split the document's content into chunks
            chunks = self.text_splitter.split_text(doc['content'])
            
            # Here you could add metadata to each chunk, like the source filename
            # For now, we'll just use the text.
            all_chunks.extend(chunks)
            print(f"  - Created {len(chunks)} chunks from {doc['source']}")
            
        return all_chunks