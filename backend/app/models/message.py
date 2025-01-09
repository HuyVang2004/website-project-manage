from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base
from datetime import datetime

class Message(Base):
    __tablename__ = "messages"

    message_id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    project_id = Column(String(36), ForeignKey('projects.project_id'), nullable=False)
    sender_id = Column(String(36), ForeignKey('users.user_id'), nullable=False)
    content = Column(Text, nullable=False)
    sent_time = Column(DateTime, default=datetime.utcnow)


    sender = relationship("User", back_populates="messages")
    project = relationship("Project", back_populates="messages")
