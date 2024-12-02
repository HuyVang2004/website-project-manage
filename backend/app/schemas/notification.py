from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class NotificationCreate(BaseModel):
    notification_id: str
    user_id: str
    message: str
    is_read: Optional[bool] = False

class NotificationResponse(BaseModel):
    notification_id: str
    user_id: str
    message: str
    created_time: datetime
    is_read: bool

class NotificationUpdate(BaseModel):
    is_read: bool
