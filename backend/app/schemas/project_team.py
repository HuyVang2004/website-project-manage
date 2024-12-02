from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ProjectTeamCreate(BaseModel):
    project_team_id: str
    user_id: str
    project_id: str
    role: str

class ProjectTeamResponse(BaseModel):
    project_team_id: str
    user_id: str
    project_id: str
    role: str
    join_time: datetime

class ProjectTeamUpdate(BaseModel):
    role: Optional[str]
