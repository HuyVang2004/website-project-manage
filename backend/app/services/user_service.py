from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.db.session import get_db
from passlib.context import CryptContext
from fastapi import HTTPException
from app.core.security import create_access_token, verify_password


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Create user
def create_user(user: UserCreate, db: Session):
    new_user = User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Get user by ID
def get_user_by_id(user_id: str, db: Session):
    return db.query(User).filter(User.user_id == user_id).first()

# Reset password
def reset_password(email: str, new_password: str, db: Session):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.password = pwd_context.hash(new_password)
    db.commit()
    return {"message": "Password updated successfully"}


# Đăng nhập người dùng và tạo access token
def login_user(email: str, password: str, db: Session):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token(data={"sub": user.email, "user_id": user.user_id})

    return {"access_token": access_token, "token_type": "bearer", "user": user}
