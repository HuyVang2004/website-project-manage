from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import datetime

from app.schemas.project import ProjectCreate, ProjectResponse, ProjectUpdate
from app.models.project import Project
from app.db.session import get_db
from app.services.project_service import create_project, get_project_by_id

router = APIRouter()

@router.post("/", response_model=ProjectResponse)
def create_project_endpoint(project: ProjectCreate, db: Session = Depends(get_db)):
    return create_project(project, db)

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: str, db: Session = Depends(get_db)):
    project = get_project_by_id(project_id, db)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(project_id: str, project_update: ProjectUpdate, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.project_id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    for field, value in project_update.dict(exclude_unset=True).items():
        setattr(project, field, value)

    project.update_time = datetime.now()

    db.commit()
    db.refresh(project)
    return project

@router.delete("/{project_id}", response_model=dict)
def delete_project(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.project_id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return {"message": f"Project with ID {project_id} has been deleted successfully"}
