from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.security import hash_password
from app.schemas.user import UserCreate, UserResponse
from app.models.user import User
from app.db.session import get_db
from typing import List

router = APIRouter()

# Create a new admin
@router.post("/create-admin", response_model=UserResponse)
def create_admin(user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = hash_password(user.password)
    user_data = user.dict()
    user_data["password"] = hashed_password
    user_data["role"] = "admin"

    new_admin = User(**user_data)
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return new_admin

# Delete a user by username
@router.delete("/delete-user", response_model=dict)
def delete_user_by_username(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    db.delete(user)
    db.commit()
    return {"message": f"User '{username}' deleted successfully"}

# Get all users
@router.get("/users", response_model=List[UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

# Get all admins
@router.get("/admins", response_model=List[UserResponse])
def get_all_admins(db: Session = Depends(get_db)):
    admins = db.query(User).filter(User.role == "admin").all()
    if not admins:
        raise HTTPException(status_code=404, detail="No admins found.")
    return admins
