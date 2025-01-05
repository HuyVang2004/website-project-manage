from pydantic import BaseModel
from datetime import datetime
from typing import Optional
import uuid
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
    create_time: datetime

class HelpUpdate(BaseModel):
    content: Optional[str] = None
    help_type: Optional[str] = None
