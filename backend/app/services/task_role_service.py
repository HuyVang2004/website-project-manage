from sqlalchemy.orm import Session
from app.models.task_role import TaskRole
from app.schemas.task_role import TaskRoleCreate, TaskRoleUpdate
from app.db.session import get_db

def create_task_role(task_role: TaskRoleCreate, db: Session = next(get_db())):
    new_task_role = TaskRole(**task_role.dict())
    db.add(new_task_role)
    db.commit()
    db.refresh(new_task_role)
    return new_task_role

def get_task_role_by_id(task_role_id: str, db: Session = next(get_db())):
    return db.query(TaskRole).filter(TaskRole.task_role_id == task_role_id).first()

def get_task_roles_by_task(task_id: str, db: Session = next(get_db())):
    return db.query(TaskRole).filter(TaskRole.task_id == task_id).all()

def get_task_roles_by_user(user_id: str, db: Session = next(get_db())):
    return db.query(TaskRole).filter(TaskRole.user_id == user_id).all()

def update_task_role(task_role_id: str, task_role_update: TaskRoleUpdate, db: Session = next(get_db())):
    task_role = db.query(TaskRole).filter(TaskRole.task_role_id == task_role_id).first()
    if not task_role:
        return None
    for field, value in task_role_update.dict(exclude_unset=True).items():
        setattr(task_role, field, value)
    db.commit()
    db.refresh(task_role)
    return task_role

def delete_task_role(task_role_id: str, db: Session = next(get_db())):
    task_role = db.query(TaskRole).filter(TaskRole.task_role_id == task_role_id).first()
    if not task_role:
        return None
    db.delete(task_role)
    db.commit()
    return task_role
