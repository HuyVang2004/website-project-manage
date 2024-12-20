from sqlalchemy import Column, String, DateTime
from sqlalchemy.sql import func
from app.db.base import Base
import uuid

class User(Base):
    __tablename__ = "users"

    user_id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    username = Column(String(50), nullable=False)
    password = Column(String(255), nullable=False, unique=True)
    email = Column(String(100), nullable=False, unique=True)
    role = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    full_name = Column(String(100), nullable=True)
    profile_picture = Column(String(255), nullable=True)
