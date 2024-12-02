from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task import TaskCreate

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
