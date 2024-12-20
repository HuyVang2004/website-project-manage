from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.task import TaskCreate, TaskResponse, TaskUpdate

from app.db.session import get_db
from app.models.task import Task
from app.db.session import get_db
from app.services.task_service import create_task, get_task_by_id, get_tasks_by_project_id

router = APIRouter()

@router.post("/", response_model=TaskResponse)
def create_task_endpoint(task: TaskCreate, db: Session = Depends(get_db)):
    return create_task(task, db)

@router.get("/{task_id}", response_model=TaskResponse)
def get_task(task_id: str, db: Session = Depends(get_db)):
    task = get_task_by_id(task_id, db)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.get("/project/{project_id}", response_model=list[TaskResponse])
def get_tasks_for_project(project_id: str, db: Session = Depends(get_db)):
    tasks = get_tasks_by_project_id(project_id, db)
    return tasks

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: str, task_update: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.task_id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    for field, value in task_update.dict(exclude_unset=True).items():
        setattr(task, field, value)

    task.update_time = datetime.now()
    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}", response_model=dict)
def delete_task(task_id: str, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.task_id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"message": f"Task with ID {task_id} has been deleted successfully"}
