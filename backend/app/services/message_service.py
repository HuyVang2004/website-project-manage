from sqlalchemy.orm import Session
from typing import List
from app.models.message import Message
from app.schemas.message import MessageCreate, MessageUpdate
from concurrent.futures import ThreadPoolExecutor
from fastapi import HTTPException
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession

async def get_messages_by_project(
    project_id: str,
    db: AsyncSession,
    limit: int = None,
    order_by_desc: bool = False
) -> List[Message]:
    """
    Get messages for a project with optional limit and ordering
    """
    stmt = select(Message).filter(Message.project_id == project_id)
    
    if order_by_desc:
        stmt = stmt.order_by(Message.sent_time.desc())
    else:
        stmt = stmt.order_by(Message.sent_time.asc())
    
    if limit:
        stmt = stmt.limit(limit)
    
    result = await db.execute(stmt)
    return result.scalars().all()

def get_messages_by_user(sender_id: str, db: Session, limit: int = 50, offset: int = 0) -> List[Message]:
    return db.query(Message).filter(Message.sender_id == sender_id)\
             .order_by(Message.sent_time.desc())\
             .offset(offset).limit(limit).all()

async def batch_create_messages(messages: List[MessageCreate], db: Session) -> List[Message]:
    try:
        # Convert messages to dictionaries for bulk insert
        message_dicts = []
        for msg in messages:
            message_dict = msg.dict()
            message_dict['sent_time'] = datetime.utcnow()
            # message_dict['updated_at'] = datetime.utcnow()
            message_dicts.append(message_dict)

        # Bulk insert messages
        db.bulk_insert_mappings(Message, message_dicts)
        db.commit()

        # Return created messages
        created_messages = []
        for msg_dict in message_dicts:
            msg = Message(**msg_dict)
            created_messages.append(msg)
        
        return created_messages

    except Exception as e:
        db.rollback()
        print(f"Error in batch creating messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create messages")

def create_message(message: MessageCreate, db: Session) -> Message:
    try:
        db_message = Message(
            project_id=message.project_id,
            sender_id=message.sender_id,
            content=message.content,
            sent_time=datetime.utcnow(),
            # updated_at=datetime.utcnow()
        )
        db.add(db_message)
        db.commit()
        db.refresh(db_message)
        return db_message
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

def update_message(message_id: str, message_update: MessageUpdate, db: Session) -> Message:
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    try:
        for field, value in message_update.dict(exclude_unset=True).items():
            setattr(message, field, value)
        message.updated_at = datetime.utcnow()
        
        db.commit()
        db.refresh(message)
        return message
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))