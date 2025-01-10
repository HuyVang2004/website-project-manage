from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base
import uuid
class ProjectDocument(Base):
    __tablename__ = "project_documents"

    document_id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    project_id = Column(String(36), ForeignKey("projects.project_id"), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(255), nullable=False)
    uploaded_by = Column(String(36), ForeignKey("users.user_id"), nullable=False)
    uploaded_time = Column(DateTime, server_default=func.now(), nullable=False)
    description = Column(Text, nullable=True)

    project = relationship("Project", backref="documents")
    uploaded_by_user = relationship("User", backref="uploaded_documents")
