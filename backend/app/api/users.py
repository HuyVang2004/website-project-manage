# api/users.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.security import hash_password, verify_password, create_reset_token, verify_reset_token
from app.schemas.user import UserCreateForUser, UserResponse, UserUpdate
from app.models.user import User
from app.db.session import get_db
from app.services.user_service import reset_password
from fastapi_mail import FastMail, MessageSchema
from app.core.config import Settings

router = APIRouter()

# User registration
@router.post("/register", response_model=UserResponse)
def create_user_with_default_role(user: UserCreateForUser, db: Session = Depends(get_db)):
    hashed_password = hash_password(user.password)
    user_data = user.dict()
    user_data["password"] = hashed_password
    user_data["role"] = "user"

    new_user = User(**user_data)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# User login
@router.post("/login", response_model=UserResponse)
def login(username: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user

# Get user info
@router.get("/get-user-info/{user_id}", response_model=UserResponse)
def get_user_by_id(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Update user info
@router.put("/update-user-info/{user_id}", response_model=UserResponse)
def update_user_info(user_id: str, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = user_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return user

# Change password
@router.put("/change-password/{user_id}")
def change_password(user_id: str, old_password: str, new_password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(old_password, user.password):
        raise HTTPException(status_code=400, detail="Old password is incorrect")

    user.password = hash_password(new_password)
    db.commit()
    return {"message": "Password updated successfully"}


