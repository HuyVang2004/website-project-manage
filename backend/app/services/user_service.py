from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.db.session import get_db

def create_user(user: UserCreate, db: Session = next(get_db())):
    new_user = User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def get_user_by_id(user_id: str, db: Session = next(get_db())):
    return db.query(User).filter(User.user_id == user_id).first()
