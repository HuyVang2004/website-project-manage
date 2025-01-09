from pydantic import BaseModel
from datetime import datetime
from typing import Optional
import uuid

class NotificationCreate(BaseModel):
    user_id: str
    message: str
    is_read: Optional[bool] = False
    link: Optional[str] = None  # Added link as Optional

class NotificationResponse(BaseModel):
    notification_id: str
    user_id: str
    message: str
    created_time: datetime
    is_read: bool
    link: Optional[str] = None  # Added link as Optional

class NotificationUpdate(BaseModel):
    is_read: bool
