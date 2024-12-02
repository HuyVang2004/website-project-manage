from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CommentCreate(BaseModel):
    comment_id: str
    task_id: str
    created_by: str
    content: str

class CommentResponse(BaseModel):
    comment_id: str
    task_id: str
    created_by: str
    content: str
    created_time: datetime

class CommentUpdate(BaseModel):
    content: Optional[str]
