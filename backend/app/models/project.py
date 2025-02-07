from sqlalchemy import Column, String, DateTime, Integer, ForeignKey, Text
from sqlalchemy.sql import func
from app.db.base import Base
from sqlalchemy.orm import relationship
import uuid
class Project(Base):
    __tablename__ = "projects"

    project_id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    project_name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    created_by = Column(String(36), ForeignKey("users.user_id"), nullable=False)
    status = Column(String(50), nullable=True)
    update_time = Column(DateTime, onupdate=func.now())
    messages = relationship("Message", back_populates="project")