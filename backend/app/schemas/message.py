from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class MessageCreate(BaseModel):
    project_id: str
    sender_id: str
    content: str

class MessageResponse(BaseModel):
    message_id: int
    project_id: str
    sender_id: str
    content: str
    sent_time: datetime

class MessageUpdate(BaseModel):
    content: Optional[str] = None

class Config:
    from_attributes = True
