from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class ProjectCreate(BaseModel):
    project_id: str
    project_name: str
    description: str | None = None
    start_date: datetime
    end_date: datetime
    status: str
    budget: int
    created_by: str
    target: str | None = None

class ProjectResponse(BaseModel):
    project_id: str
    project_name: str
    description: str | None
    start_date: datetime
    end_date: datetime
    status: str
    budget: int
    created_by: str
    update_time: datetime | None
    target: str | None


class ProjectUpdate(BaseModel):
    project_name: Optional[str]
    description: Optional[str]
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    status: Optional[str]
    budget: Optional[int]
    target: Optional[str]
    

class Config:
    from_attributes = True
