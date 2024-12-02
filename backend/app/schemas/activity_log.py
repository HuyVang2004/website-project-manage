from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ActivityLogCreate(BaseModel):
    log_id: str
    user_id: str
    activity_type: str
    description: str

class ActivityLogResponse(BaseModel):
    log_id: str
    user_id: str
    activity_type: str
    description: str
    timestamp: datetime

class ActivityLogUpdate(BaseModel):
    activity_type: Optional[str]
    description: Optional[str]
