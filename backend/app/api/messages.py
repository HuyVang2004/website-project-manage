from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.message import MessageCreate, MessageResponse, MessageUpdate
from app.services.message_service import create_message, update_message, get_message_by_id, get_messages_by_project, get_messages_by_user
from app.db.session import get_db

router = APIRouter()

@router.post("/", response_model=MessageResponse)
def create_new_message(message: MessageCreate, db: Session = Depends(get_db)):
    return create_message(message, db)

@router.get("/{message_id}", response_model=MessageResponse)
def get_message(message_id: int, db: Session = Depends(get_db)):
    message = get_message_by_id(message_id, db)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message

@router.put("/{message_id}", response_model=MessageResponse)
def update_message_content(message_id: int, message_update: MessageUpdate, db: Session = Depends(get_db)):
    message = update_message(message_id, message_update, db)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message

@router.get("/project/{project_id}", response_model=list[MessageResponse])
def get_messages_for_project(project_id: str, db: Session = Depends(get_db)):
    messages = get_messages_by_project(project_id, db)
    if not messages:
        raise HTTPException(status_code=404, detail="No messages found for this project")
    return messages

@router.get("/user/{sender_id}", response_model=list[MessageResponse])
def get_messages_by_user(sender_id: str, db: Session = Depends(get_db)):
    messages = get_messages_by_user(sender_id, db)
    if not messages:
        raise HTTPException(status_code=404, detail="No messages found for this user")
    return messages
