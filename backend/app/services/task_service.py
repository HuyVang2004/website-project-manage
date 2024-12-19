from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task import TaskCreate
from app.models.project import Project
from app.models.user import User
from typing import List, Optional

def create_task(task: TaskCreate, db: Session):
    new_task = Task(**task.dict())
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

def get_task_by_id(task_id: str, db: Session):
    return db.query(Task).filter(Task.task_id == task_id).first()

def get_tasks_by_project_id(project_id: str, db: Session):
    return db.query(Task).filter(Task.project_id == project_id).all()

def get_user_and_project_ids(db: Session, username: str, project_name: str) -> Optional[dict]:
    user = db.query(User).filter(User.username == username).first()
    project = db.query(Project).filter(Project.project_name == project_name).first()

    if not user or not project:
        return None

    return {"user_id": user.user_id, "project_id": project.project_id}

