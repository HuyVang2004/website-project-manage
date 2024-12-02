from fastapi import APIRouter, HTTPException
from app.schemas.project import ProjectCreate, ProjectResponse
from app.services.project_service import create_project, get_project_by_id

router = APIRouter()

@router.post("/", response_model=ProjectResponse)
def create_project_endpoint(project: ProjectCreate):
    return create_project(project)

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: str):
    project = get_project_by_id(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
