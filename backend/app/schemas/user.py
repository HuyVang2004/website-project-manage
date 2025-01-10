from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    username: str
    password: str
    email: EmailStr
    role: str
    full_name: Optional[str] = None
    gender: Optional[str] = None 
    job: Optional[str] = None   

class UserCreateForUser(BaseModel):
    username: str
    password: str
    email: EmailStr
    full_name: Optional[str] = None
    gender: Optional[str] = None  
    job: Optional[str] = None    

class UserResponse(BaseModel):
    user_id: str
    username: str
    email: EmailStr
    full_name: Optional[str]
    gender: Optional[str]      
    job: Optional[str]         
    created_at: datetime

class UserUpdate(BaseModel):
    email: Optional[EmailStr]
    full_name: Optional[str]
    gender: Optional[str] = None  
    job: Optional[str] = None     

class Config:
    from_attributes = True