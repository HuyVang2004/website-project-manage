from pydantic import BaseModel
from datetime import datetime
from typing import Optional
import uuid

class TaskCreate(BaseModel):
    project_id: str
    task_name: str
    assigned_to: Optional[str]
    status: str
    due_date: datetime
    priority: str
    budget: int

class TaskResponse(BaseModel):
    task_id: str
    project_id: str
    task_name: str
    assigned_to: Optional[str]
    status: str
    due_date: datetime
    priority: str
    budget: int
    create_time: datetime
    update_time: Optional[datetime]

class TaskUpdate(BaseModel):
    task_name: Optional[str]
    assigned_to: Optional[str]
    status: Optional[str]
    due_date: Optional[datetime]
    priority: Optional[str]
    budget: Optional[int]
