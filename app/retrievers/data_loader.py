# import pandas as pd
# import os

# # Get the absolute path to the directory containing this script (retrievers/)
# RETRIEVERS_DIR = os.path.dirname(os.path.abspath(__file__))
# # Go up one level to get the path to the 'app' package directory (/app/app/)
# APP_PACKAGE_DIR = os.path.dirname(RETRIEVERS_DIR)
# EXCEL_FILE_PATH = os.path.join(APP_PACKAGE_DIR, 'context', 'all.xlsx')

# class ProjectDataLoader:
#     def __init__(self, file_path=EXCEL_FILE_PATH):
#         self.file_path = file_path

#     def load_and_clean(self):
#         df = pd.read_excel(self.file_path, header=1)
#         df.columns = df.columns.str.strip().str.lower()

#         rename_map = {
#             'project name': 'project_name',
#             'country': 'countryshortname',
#             'region': 'regionname',
#             'project status': 'status',
#             'implementing agency': 'impagency',
#             'project development objective': 'pdo'
#         }
#         df = df.rename(columns=rename_map)
#         required = ['project_name', 'countryshortname', 'regionname', 'status', 'impagency', 'pdo']

#         missing_cols = [col for col in required if col not in df.columns]
#         if missing_cols:
#             raise ValueError(f"Missing expected columns: {missing_cols}")

#         return df.dropna(subset=required)


import os
from pypdf import PdfReader
import docx

class DocumentLoader:
    def __init__(self, directory_path: str):
        """
        Initializes the loader with the path to the directory containing documents.
        """
        if not os.path.isdir(directory_path):
            raise ValueError(f"The provided path '{directory_path}' is not a valid directory.")
        self.directory_path = directory_path

    def _read_pdf(self, file_path: str) -> str:
        """Reads text from a single PDF file."""
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text

    def _read_docx(self, file_path: str) -> str:
        """Reads text from a single DOCX file."""
        doc = docx.Document(file_path)
        text = ""
        for para in doc.paragraphs:
            text += para.text + "\n"
        return text

    def load_documents(self) -> list:
        """
        Loads all .pdf and .docx files from the directory and returns a list of dictionaries,
        each containing the file name and its text content.
        """
        documents = []
        print(f"Loading documents from: {self.directory_path}")
        for filename in os.listdir(self.directory_path):
            file_path = os.path.join(self.directory_path, filename)
            content = ""
            if filename.lower().endswith('.pdf'):
                content = self._read_pdf(file_path)
            elif filename.lower().endswith('.docx'):
                content = self._read_docx(file_path)
            
            if content:
                documents.append({"source": filename, "content": content})
                print(f"  - Loaded {filename}")

        return documents