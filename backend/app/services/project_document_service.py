from sqlalchemy.orm import Session
from app.models.project_document import ProjectDocument
from app.schemas.project_document import ProjectDocumentCreate, ProjectDocumentUpdate
from app.db.session import get_db

def create_project_document(project_id: str, project_document: ProjectDocumentCreate, db: Session = next(get_db())):
    """
    Create a new project document associated with a specific project ID.
    """
    new_project_document = ProjectDocument(project_id=project_id, **project_document.dict())
    db.add(new_project_document)
    db.commit()
    db.refresh(new_project_document)
    return new_project_document

def get_project_documents_by_project(project_id: str, db: Session = next(get_db())):
    """
    Retrieve all documents associated with a specific project ID.
    """
    return db.query(ProjectDocument).filter(ProjectDocument.project_id == project_id).all()

def update_project_document(project_id: str, project_document_update: ProjectDocumentUpdate, db: Session = next(get_db())):
    """
    Update a project document by its associated project ID.
    """
    project_document = db.query(ProjectDocument).filter(ProjectDocument.project_id == project_id).first()
    if not project_document:
        return None
    for field, value in project_document_update.dict(exclude_unset=True).items():
        setattr(project_document, field, value)
    db.commit()
    db.refresh(project_document)
    return project_document

def delete_project_document(project_id: str, db: Session = next(get_db())):
    """
    Delete a project document by its associated project ID.
    """
    project_document = db.query(ProjectDocument).filter(ProjectDocument.project_id == project_id).first()
    if not project_document:
        return None
    db.delete(project_document)
    db.commit()
    return project_document

