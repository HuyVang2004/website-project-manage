from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class MessageCreate(BaseModel):
    project_id: str
    sender_id: str
    content: str
    sent_time: datetime

class MessageResponse(BaseModel):
    message_id: str
    project_id: str
    sender_id: str
    content: str
    sent_time: datetime

    model_config = {
        "from_attributes": True
    }

class MessageUpdate(BaseModel):
    content: Optional[str] = None

class Config:
    from_attributes = True
