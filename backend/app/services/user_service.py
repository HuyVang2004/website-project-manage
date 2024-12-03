from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.db.session import get_db
from passlib.context import CryptContext
from fastapi import HTTPException

def create_user(user: UserCreate, db: Session = next(get_db())):
    new_user = User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def get_user_by_id(user_id: str, db: Session = next(get_db())):
    return db.query(User).filter(User.user_id == user_id).first()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def reset_password(email: str, new_password: str, db: Session):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.password = pwd_context.hash(new_password)
    db.commit()
    return {"message": "Password updated successfully"}