from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base
import uuid
class TaskRole(Base):
    __tablename__ = "task_role"

    task_role_id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    task_id = Column(String(36), ForeignKey("tasks.task_id"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.user_id"), nullable=False)
    can_read = Column(Boolean, default=True, nullable=False)
    can_change = Column(Boolean, default=False, nullable=False)

    # Relationships
    task = relationship("Task", backref="task_roles")
    user = relationship("User", backref="task_roles")
