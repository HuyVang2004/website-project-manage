from pydantic import BaseModel
from datetime import datetime

class ProjectCreate(BaseModel):
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
    update_time: datetime
    target: str | None

class Config:
    from_attributes = True
