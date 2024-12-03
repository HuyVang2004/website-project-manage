from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from app.core.security import hash_password, verify_password, create_reset_token, verify_reset_token
from app.schemas.user import UserCreate, UserResponse, UserUpdate
from app.models.user import User
from app.db.session import get_db
from app.services.user_service import reset_password


router = APIRouter()

@router.post("/", response_model=UserResponse)
def create_user_endpoint(user: UserCreate, db: Session = Depends(get_db)):
    # Hash mật khẩu trước khi lưu
    hashed_password = hash_password(user.password)
    user_data = user.dict()
    user_data["password"] = hashed_password

    # Tạo và lưu user mới
    new_user = User(**user_data)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/{user_id}", response_model=UserResponse)
def get_user_endpoint(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/{user_id}", response_model=UserResponse)
def update_user_endpoint(user_id: str, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    for field, value in user_update.dict(exclude_unset=True).items():
        setattr(user, field, value)
    user.updated_at = datetime.now()
    db.commit()
    db.refresh(user)
    return user

@router.delete("/{user_id}", response_model=dict)
def delete_user_endpoint(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": f"User with ID {user_id} has been deleted successfully"}


@router.post("/login", response_model=dict)
def login(username: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful"}


@router.post("/forgot-password/")
def forgot_password(email: str, db: Session = Depends(get_db)):
    # Tạo token đặt lại mật khẩu
    token = create_reset_token(email)
    # Logic gửi email có thể thêm ở đây
    return {"message": "Reset password email sent", "token": token}

@router.post("/reset-password/")
def reset_password_endpoint(token: str, new_password: str, db: Session = Depends(get_db)):
    email = verify_reset_token(token)
    return reset_password(email, new_password, db)