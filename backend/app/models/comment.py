from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base import Base
import uuid
class Comment(Base):
    __tablename__ = "comments"

    comment_id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    task_id = Column(String(36), ForeignKey("tasks.task_id"), nullable=False)
    created_by = Column(String(36), ForeignKey("users.user_id"), nullable=False)
    content = Column(Text, nullable=False)
    created_time = Column(DateTime, server_default=func.now(), nullable=False)

    task = relationship("Task", backref="comments")
    user = relationship("User", backref="comments")
