# api/projects.py
from fastapi import APIRouter, Depends, HTTPException, Response, File, UploadFile
from sqlalchemy.orm import Session
from typing import List
from app.schemas.project import ProjectCreate, ProjectResponse, ProjectUpdate
from app.services.project_service import (
    create_project,
    get_project_by_id,
    update_project,
    delete_project,
    list_projects,
)
from app.db.session import get_db

from app.services.aws_s3_service import get_image_from_project_s3, upload_image_to_project_s3, upload_pdf_to_project_document_s3

router = APIRouter()

@router.post("/projects/{project_id}/upload-image")
async def upload_project_image(project_id: str, file: UploadFile = File(...)):
    try:
        # Upload the image for the given project_id
        upload_image_to_project_s3(project_id, file)
        return {"message": "Image uploaded successfully."}
    except HTTPException as e:
        raise e

@router.get("/projects/{project_id}/image")
def get_project_image(project_id: str):
    try:
        # Attempt to get the project image
        image_data = get_image_from_project_s3(project_id)
        return Response(content=image_data, media_type="image/jpeg")
    except HTTPException as e:
        raise e


@router.post("/projects/{project_id}/upload-pdf")
async def upload_project_pdf(project_id: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    """
    Upload a PDF file to the 'project_document' folder in S3 for the given project.
    If the folder named after the project's name does not exist, it will be created.
    """
    # Validate file type
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    # Fetch the project name using the project_id
    project = get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found.")

    # Use the project name as the folder name
    project_name = project.project_name

    try:
        # Upload the PDF to the corresponding folder in the S3 bucket
        upload_pdf_to_project_document_s3(project_name, file)
        return {"message": f"PDF file '{file.filename}' uploaded successfully to project '{project_name}'."}
    except HTTPException as e:
        raise e



@router.post("/projects/by-username", response_model=ProjectResponse)
def create_project_with_user(
    project: ProjectCreate, username: str, db: Session = Depends(get_db)
):
    return create_project_with_username(db, project, username)


@router.post("/projects", response_model=ProjectResponse)
def create_new_project(project: ProjectCreate, db: Session = Depends(get_db)):
    return create_project(db, project)

@router.get("/projects/{project_id}", response_model=ProjectResponse)
def get_project(project_id: str, db: Session = Depends(get_db)):
    return get_project_by_id(db, project_id)

@router.put("/projects/{project_id}", response_model=ProjectResponse)
def update_existing_project(
    project_id: str, project_update: ProjectUpdate, db: Session = Depends(get_db)
):
    return update_project(db, project_id, project_update)

@router.delete("/projects/{project_id}")
def delete_existing_project(project_id: str, db: Session = Depends(get_db)):
    return delete_project(db, project_id)

@router.get("/projects", response_model=List[ProjectResponse])
def get_all_projects(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return list_projects(db, skip=skip, limit=limit)