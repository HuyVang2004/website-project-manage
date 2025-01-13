from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.task_role import TaskRoleCreate, TaskRoleResponse, TaskRoleUpdate
from app.services.task_role_service import create_task_role, get_task_role_by_id, get_task_roles_by_task, get_task_roles_by_user, update_task_role, delete_task_role
from app.db.session import get_db

router = APIRouter()

@router.post("/", response_model=TaskRoleResponse)
def create_task_role_endpoint(task_role: TaskRoleCreate, db: Session = Depends(get_db)):
    return create_task_role(task_role, db)

@router.get("/{task_role_id}", response_model=TaskRoleResponse)
def get_task_role_endpoint(task_role_id: str, db: Session = Depends(get_db)):
    task_role = get_task_role_by_id(task_role_id, db)
    if not task_role:
        raise HTTPException(status_code=404, detail="Task role not found")
    return task_role

@router.get("/task/{task_id}", response_model=list[TaskRoleResponse])
def get_task_roles_by_task_endpoint(task_id: str, db: Session = Depends(get_db)):
    task_roles = get_task_roles_by_task(task_id, db)
    if not task_roles:
        raise HTTPException(status_code=404, detail="No task roles found for this task")
    return task_roles

@router.get("/user/{user_id}", response_model=list[TaskRoleResponse])
def get_task_roles_by_user_endpoint(user_id: str, db: Session = Depends(get_db)):
    task_roles = get_task_roles_by_user(user_id, db)
    if not task_roles:
        raise HTTPException(status_code=404, detail="No task roles found for this user")
    return task_roles

@router.put("/{task_role_id}", response_model=TaskRoleResponse)
def update_task_role_endpoint(task_role_id: str, task_role_update: TaskRoleUpdate, db: Session = Depends(get_db)):
    updated_task_role = update_task_role(task_role_id, task_role_update, db)
    if not updated_task_role:
        raise HTTPException(status_code=404, detail="Task role not found")
    return updated_task_role

@router.delete("/{task_role_id}", response_model=dict)
def delete_task_role_endpoint(task_role_id: str, db: Session = Depends(get_db)):
    task_role = delete_task_role(task_role_id, db)
    if not task_role:
        raise HTTPException(status_code=404, detail="Task role not found")
    return {"message": f"Task role with ID {task_role_id} has been deleted successfully"}

@router.get("/user/{user_id}/in-progress-count", response_model=int)
def get_in_progress_task_count_by_user_endpoint(user_id: str, db: Session = Depends(get_db)):
    from app.services.task_service import count_tasks_by_user_and_status
    count = count_tasks_by_user_and_status(user_id, 'Đang tiến hành', db)
    return count

@router.get("/user/{user_id}/completed-count", response_model=int)
def get_completed_task_count_by_user_endpoint(user_id: str, db: Session = Depends(get_db)):
    from app.services.task_service import count_tasks_by_user_and_status
    count = count_tasks_by_user_and_status(user_id, 'Đã hoàn thành', db)
    return count
