# api/projects.py
from fastapi import APIRouter, Depends, HTTPException
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

router = APIRouter()

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