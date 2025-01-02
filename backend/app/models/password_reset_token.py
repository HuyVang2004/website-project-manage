from sqlalchemy import Column, String, DateTime
from app.db.base import Base

class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"

    token = Column(String(255), primary_key=True) 
    email = Column(String(255), nullable=False)   
    expires_at = Column(DateTime, nullable=False) 