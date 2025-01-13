from sqlalchemy.orm import Session
from app.models.message import Message
from app.schemas.message import MessageCreate, MessageUpdate
from app.db.session import get_db
from fastapi import HTTPException


def create_message(message: MessageCreate, db: Session):
    new_message = Message(**message.dict())
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message

def get_message_by_id(message_id: int, db: Session):
    return db.query(Message).filter(Message.message_id == message_id).first()


def update_message(message_id: int, message_update: MessageUpdate, db: Session):
    message = db.query(Message).filter(Message.message_id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    for var, value in message_update.dict(exclude_unset=True).items():
        setattr(message, var, value)

    db.commit()
    db.refresh(message)
    return message


def get_messages_by_project(project_id: str, db: Session):
    return db.query(Message).filter(Message.project_id == project_id).all()


def get_messages_by_user(sender_id: str, db: Session):
    return db.query(Message).filter(Message.sender_id == sender_id).all()
