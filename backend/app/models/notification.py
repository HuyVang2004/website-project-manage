from sqlalchemy import Column, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base import Base
import uuid

class Notification(Base):
    __tablename__ = "notifications"

    notification_id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    user_id = Column(String(36), ForeignKey("users.user_id"), nullable=False)
    message = Column(Text, nullable=False)
    created_time = Column(DateTime, server_default=func.now(), nullable=False)
    is_read = Column(Boolean, default=False)
    link = Column(String(255), nullable=True) 

    user = relationship("User", backref="notifications")
