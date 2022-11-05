
from fastapi import FastAPI, Depends, HTTPException
from database import load_database, load_session
from nlp import generate_questions
from models.document import DocumentModel
from pydantic import BaseModel
from sqlalchemy.orm import Session

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    load_database()

class CreateDocumentModel(BaseModel):
    title: str
    content: str

@app.post("/documents")
async def create_document(document: CreateDocumentModel = None, db: Session = Depends(load_session)):
    document = DocumentModel(title=document.title, content=document.content)
    db.add(document)
    db.commit()
    return document


@app.get("/documents")
async def get_documents(db: Session = Depends(load_session)):
    return db.query(DocumentModel).all()

@app.get("/documents/{document_id}/questions")
async def get_questions(document_id: int, db: Session = Depends(load_session)):
    document = db.query(DocumentModel).get(document_id)

    if document is None:
        raise HTTPException(status_code=404, detail="Document not found")

    text = document.content
    questions = generate_questions(text)
    return questions
