from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
import uuid
class ProjectCreate(BaseModel):
    project_name: str
    description: str | None = None
    start_date: datetime
    end_date: datetime
    created_by: str
    status: Optional[str] = None 

class ProjectResponse(BaseModel):
    project_id: str
    project_name: str
    description: str | None
    start_date: datetime
    end_date: datetime
    created_by: str
    status: Optional[str] = None 
    update_time: datetime | None
 

class ProjectUpdate(BaseModel):
    project_name: Optional[str]
    description: Optional[str]
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    status: Optional[str] = None 
    

class Config:
    from_attributes = True
