from pydantic import BaseModel
from datetime import datetime
from typing import Optional
import uuid

class TaskCreate(BaseModel):
    project_id: str
    task_name: str
    assigned_to: Optional[str] = None  
    due_date: datetime
    priority: str
    status: Optional[str] = None 
    description: Optional[str] = None  

class TaskResponse(BaseModel):
    task_id: str
    project_id: str
    task_name: str
    assigned_to: Optional[str] = None  
    due_date: datetime
    priority: str
    status: Optional[str] = None 
    description: Optional[str] = None  
    start_time: Optional[datetime] = None   
    update_time: Optional[datetime] = None  

class TaskUpdate(BaseModel):
    task_name: Optional[str] = None
    assigned_to: Optional[str] = None
    due_date: Optional[datetime] = None
    priority: Optional[str] = None
    status: Optional[str] = None 
    description: Optional[str] = None
