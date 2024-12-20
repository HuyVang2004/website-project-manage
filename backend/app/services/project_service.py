# service/project_service.py
from sqlalchemy.orm import Session
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate
from fastapi import HTTPException
from app.models.user import User  # Import model User


def create_project(db: Session, project: ProjectCreate):
    new_project = Project(
        project_name=project.project_name,
        description=project.description,
        start_date=project.start_date,
        end_date=project.end_date,
        status=project.status,
        budget=project.budget,
        created_by=project.created_by,
        target=project.target,
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

def get_project_by_id(db: Session, project_id: str):
    project = db.query(Project).filter(Project.project_id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

def update_project(db: Session, project_id: str, project_update: ProjectUpdate):
    project = get_project_by_id(db, project_id)
    for key, value in project_update.dict(exclude_unset=True).items():
        setattr(project, key, value)
    db.commit()
    db.refresh(project)
    return project

def delete_project(db: Session, project_id: str):
    project = get_project_by_id(db, project_id)
    db.delete(project)
    db.commit()
    return {"message": "Project deleted successfully"}

def list_projects(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Project).offset(skip).limit(limit).all()

