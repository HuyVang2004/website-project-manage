from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    user_id: str 
    username: str
    password: str
    email: EmailStr
    role: str
    full_name: str | None = None
    profile_picture: str | None = None

class UserResponse(BaseModel):
    user_id: str
    username: str
    email: EmailStr
    role: str
    full_name: str | None
    profile_picture: str | None
    created_at: datetime

class UserUpdate(BaseModel):
    username: Optional[str]
    email: Optional[EmailStr]
    role: Optional[str]
    full_name: Optional[str]
    profile_picture: Optional[str]

class Config:
    from_attributes = True