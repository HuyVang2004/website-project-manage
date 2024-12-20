# services/comment_service.py

from sqlalchemy.orm import Session
from app.models.comment import Comment
from app.schemas.comment import CommentCreate, CommentUpdate
from app.db.session import get_db

def create_comment(comment: CommentCreate, db: Session = next(get_db())):
    new_comment = Comment(**comment.dict())
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment

def get_comment_by_id(comment_id: str, db: Session = next(get_db())):
    return db.query(Comment).filter(Comment.comment_id == comment_id).first()

def get_comments_by_task(task_id: str, db: Session = next(get_db())):
    return db.query(Comment).filter(Comment.task_id == task_id).all()

def update_comment(comment_id: str, comment_update: CommentUpdate, db: Session = next(get_db())):
    comment = db.query(Comment).filter(Comment.comment_id == comment_id).first()
    if not comment:
        return None
    for field, value in comment_update.dict(exclude_unset=True).items():
        setattr(comment, field, value)
    db.commit()
    db.refresh(comment)
    return comment

def delete_comment(comment_id: str, db: Session = next(get_db())):
    comment = db.query(Comment).filter(Comment.comment_id == comment_id).first()
    if not comment:
        return None
    db.delete(comment)
    db.commit()
    return comment
