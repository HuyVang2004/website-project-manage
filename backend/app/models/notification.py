from sqlalchemy import Column, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base import Base

class Notification(Base):
    __tablename__ = "notifications"

    notification_id = Column(String(36), primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.user_id"), nullable=False)
    message = Column(Text, nullable=False)
    created_time = Column(DateTime, server_default=func.now(), nullable=False)
    is_read = Column(Boolean, default=False)

    # Relationship to users
    user = relationship("User", backref="notifications")
