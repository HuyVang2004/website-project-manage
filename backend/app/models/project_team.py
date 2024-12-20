from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base import Base
import uuid
class ProjectTeam(Base):
    __tablename__ = "project_teams"

    project_team_id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)  # Sử dụng String(36) thay cho UUID
    user_id = Column(String(36), ForeignKey("users.user_id"), nullable=False)
    project_id = Column(String(36), ForeignKey("projects.project_id"), nullable=False)
    role = Column(String(100), nullable=False)
    join_time = Column(DateTime, server_default=func.now(), nullable=False)

    # Relationship to users and projects
    user = relationship("User", backref="project_teams")
    project = relationship("Project", backref="project_teams")
