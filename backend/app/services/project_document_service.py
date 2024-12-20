from sqlalchemy.orm import Session
from app.models.project_document import ProjectDocument
from app.schemas.project_document import ProjectDocumentCreate, ProjectDocumentUpdate
from app.db.session import get_db

def create_project_document(project_document: ProjectDocumentCreate, db: Session = next(get_db())):
    new_project_document = ProjectDocument(**project_document.dict())
    db.add(new_project_document)
    db.commit()
    db.refresh(new_project_document)
    return new_project_document

def get_project_document_by_id(document_id: str, db: Session = next(get_db())):
    return db.query(ProjectDocument).filter(ProjectDocument.document_id == document_id).first()

def get_project_documents_by_project(project_id: str, db: Session = next(get_db())):
    return db.query(ProjectDocument).filter(ProjectDocument.project_id == project_id).all()

def update_project_document(document_id: str, project_document_update: ProjectDocumentUpdate, db: Session = next(get_db())):
    project_document = db.query(ProjectDocument).filter(ProjectDocument.document_id == document_id).first()
    if not project_document:
        return None
    for field, value in project_document_update.dict(exclude_unset=True).items():
        setattr(project_document, field, value)
    db.commit()
    db.refresh(project_document)
    return project_document

def delete_project_document(document_id: str, db: Session = next(get_db())):
    project_document = db.query(ProjectDocument).filter(ProjectDocument.document_id == document_id).first()
    if not project_document:
        return None
    db.delete(project_document)
    db.commit()
    return project_document
