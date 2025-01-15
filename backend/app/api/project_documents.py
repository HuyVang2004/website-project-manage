from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.schemas.project_document import ProjectDocumentCreate, ProjectDocumentResponse, ProjectDocumentUpdate
from app.services.project_document_service import (
    create_project_document,
    get_project_documents_by_project,
    update_project_document,
    delete_project_document,
)
from app.db.session import get_db
import mimetypes

from app.services.aws_s3_service import upload_file_to_project_document_s3
router = APIRouter()

@router.post("/", response_model=ProjectDocumentResponse)
def create_project_document_endpoint( project_document: ProjectDocumentCreate, db: Session = Depends(get_db)
):
    """
    Create a new project document associated with a project ID.
    """
    return create_project_document(project_document, db)

@router.get("/{project_id}", response_model=list[ProjectDocumentResponse])
def get_project_documents_by_project_endpoint(project_id: str, db: Session = Depends(get_db)):
    """
    Get all project documents associated with a project ID.
    """
    project_documents = get_project_documents_by_project(project_id, db)
    if not project_documents:
        raise HTTPException(status_code=404, detail="No project documents found for this project")
    return project_documents

@router.put("/{project_id}", response_model=ProjectDocumentResponse)
def update_project_document_endpoint(
    project_id: str, project_document_update: ProjectDocumentUpdate, db: Session = Depends(get_db)
):
    """
    Update a project document associated with a project ID.
    """
    updated_project_document = update_project_document(project_id, project_document_update, db)
    if not updated_project_document:
        raise HTTPException(status_code=404, detail="Project document not found")
    return updated_project_document

@router.delete("/{project_id}", response_model=dict)
def delete_project_document_endpoint(project_id: str, db: Session = Depends(get_db)):
    """
    Delete a project document associated with a project ID.
    """
    project_document = delete_project_document(project_id, db)
    if not project_document:
        raise HTTPException(status_code=404, detail="Project document not found")
    return {"message": f"Project document for project ID {project_id} has been deleted successfully"}


@router.post("/upload-file/{project_document_id}")
async def upload_file_to_project_endpoint(
    project_document_id: str, file: UploadFile = File(...), db: Session = Depends(get_db)
):
    """
    Upload a file to the 'project_document' folder in the S3 bucket.
    If the folder named after the project_id does not exist, it will be created.
    """
    try:
        # Validate file type and determine content type
        content_type, _ = mimetypes.guess_type(file.filename)
        if not content_type:
            raise HTTPException(status_code=400, detail="Unable to determine file type.")
        
        # Upload the file to the S3 bucket
        upload_file_to_project_document_s3(project_document_id, file, content_type, db)
        return {"message": f"File '{file.filename}' uploaded successfully to project '{project_document_id}'."}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading file: {str(e)}")
