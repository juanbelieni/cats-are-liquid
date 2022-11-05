
from fastapi import FastAPI, Depends, HTTPException
from database import load_database, load_session
from nlp import generate_questions
from models.document import DocumentModel
from pydantic import BaseModel
from sqlalchemy.orm import Session

app = FastAPI()

# allow all cors
@app.middleware("http")
async def add_cors_headers(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response

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

@app.get("/documents/{document_id}")
async def get_document(document_id: int, db: Session = Depends(load_session)):
    document = db.query(DocumentModel).filter(DocumentModel.id == document_id).first()

    if not document:
        raise HTTPException(status_code=404, detail="Document not found")

    return document

@app.get("/documents/{document_id}/questions")
async def get_questions(document_id: int, db: Session = Depends(load_session)):
    document = db.query(DocumentModel).get(document_id)

    if document is None:
        raise HTTPException(status_code=404, detail="Document not found")

    text = document.content
    questions = generate_questions(text)
    return questions
