from sqlalchemy import Column, String, DateTime, Integer, ForeignKey
from sqlalchemy.sql import func
from app.db.base import Base
import uuid

class Task(Base):
    __tablename__ = "tasks"

    task_id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    project_id = Column(String(36), ForeignKey("projects.project_id"), nullable=False)
    task_name = Column(String(100), nullable=False)
    assigned_to = Column(String(36), ForeignKey("users.user_id"), nullable=True)
    status = Column(String(100), nullable=False)
    due_date = Column(DateTime, nullable=False)
    priority = Column(String(50), nullable=False)
    budget = Column(Integer, nullable=False)
    create_time = Column(DateTime, server_default=func.now(), nullable=False)
    update_time = Column(DateTime, onupdate=func.now())
