from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from uuid import UUID

class UserCreate(BaseModel):
    username: str
    password: str
    email: EmailStr
    role: str
    full_name: Optional[str] = None
    profile_picture: Optional[str] = None

class UserCreateForUser(BaseModel):
    username: str
    password: str
    email: EmailStr
    full_name: Optional[str] = None
    profile_picture: Optional[str] = None

class UserResponse(BaseModel):
    user_id: str
    username: str
    email: EmailStr
    # role: str
    full_name: Optional[str]
    profile_picture: Optional[str]
    created_at: datetime

class UserUpdate(BaseModel):
    # username: Optional[str]
    email: Optional[EmailStr]
    # role: Optional[str]
    full_name: Optional[str]
    profile_picture: Optional[str]

class Config:
    from_attributes = True