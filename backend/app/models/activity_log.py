from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base import Base

class ActivityLog(Base):
    __tablename__ = "activity_log"

    log_id = Column(String(36), primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.user_id"), nullable=False)
    activity_type = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    timestamp = Column(DateTime, server_default=func.now(), nullable=False)

    # Relationship to users
    user = relationship("User", backref="activity_logs")
