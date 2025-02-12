from sqlalchemy import Column, String, Text, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from app.db.base import Base
import uuid

class Help(Base):
    __tablename__ = "help"

    help_id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    user_id = Column(String(36), ForeignKey("users.user_id"), nullable=False)
    content = Column(Text, nullable=False)
    help_type = Column(String(100), nullable=False)
    content_admin = Column(Text, nullable=True)
    create_time = Column(DateTime, nullable=False)
    is_replied = Column(Boolean, default=False, nullable=False)

    user = relationship("User", backref="helps")
    