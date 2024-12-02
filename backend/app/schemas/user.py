from pydantic import BaseModel, EmailStr
from datetime import datetime

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

class Config:
    from_attributes = True