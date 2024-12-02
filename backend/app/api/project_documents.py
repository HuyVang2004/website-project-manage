from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.project_document import ProjectDocumentCreate, ProjectDocumentResponse, ProjectDocumentUpdate
from app.services.project_document_service import create_project_document, get_project_document_by_id, get_project_documents_by_project, update_project_document, delete_project_document
from app.db.session import get_db

router = APIRouter()

@router.post("/", response_model=ProjectDocumentResponse)
def create_project_document_endpoint(project_document: ProjectDocumentCreate, db: Session = Depends(get_db)):
    return create_project_document(project_document, db)

@router.get("/{document_id}", response_model=ProjectDocumentResponse)
def get_project_document_endpoint(document_id: str, db: Session = Depends(get_db)):
    project_document = get_project_document_by_id(document_id, db)
    if not project_document:
        raise HTTPException(status_code=404, detail="Project document not found")
    return project_document

@router.get("/project/{project_id}", response_model=list[ProjectDocumentResponse])
def get_project_documents_by_project_endpoint(project_id: str, db: Session = Depends(get_db)):
    project_documents = get_project_documents_by_project(project_id, db)
    if not project_documents:
        raise HTTPException(status_code=404, detail="No project documents found for this project")
    return project_documents

@router.put("/{document_id}", response_model=ProjectDocumentResponse)
def update_project_document_endpoint(document_id: str, project_document_update: ProjectDocumentUpdate, db: Session = Depends(get_db)):
    updated_project_document = update_project_document(document_id, project_document_update, db)
    if not updated_project_document:
        raise HTTPException(status_code=404, detail="Project document not found")
    return updated_project_document

@router.delete("/{document_id}", response_model=dict)
def delete_project_document_endpoint(document_id: str, db: Session = Depends(get_db)):
    project_document = delete_project_document(document_id, db)
    if not project_document:
        raise HTTPException(status_code=404, detail="Project document not found")
    return {"message": f"Project document with ID {document_id} has been deleted successfully"}
