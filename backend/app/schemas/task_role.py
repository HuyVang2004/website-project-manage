from pydantic import BaseModel
from typing import Optional

class TaskRoleCreate(BaseModel):
    task_role_id: str
    task_id: str
    user_id: str
    can_read: bool = True
    can_change: bool = False

class TaskRoleResponse(BaseModel):
    task_role_id: str
    task_id: str
    user_id: str
    can_read: bool
    can_change: bool

class TaskRoleUpdate(BaseModel):
    can_read: Optional[bool] = None
    can_change: Optional[bool] = None
