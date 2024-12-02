from sqlalchemy.orm import Session
from app.models.project import Project
from app.schemas.project import ProjectCreate
from app.db.session import get_db

def create_project(project: ProjectCreate, db: Session = next(get_db())):
    new_project = Project(**project.dict())
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

def get_project_by_id(project_id: str, db: Session = next(get_db())):
    return db.query(Project).filter(Project.project_id == project_id).first()
