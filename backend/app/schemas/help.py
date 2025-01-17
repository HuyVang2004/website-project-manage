from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class HelpCreate(BaseModel):
    user_id: str
    content: str
    help_type: str
    create_time: datetime

class HelpResponse(BaseModel):
    help_id: str
    user_id: str
    content: str
    help_type: str
    content_admin: Optional[str]
    create_time: datetime
    is_replied: bool

class HelpUpdate(BaseModel):
    content: Optional[str] = None
    help_type: Optional[str] = None
    content_admin: Optional[str] = None
    is_replied: Optional[bool] = None