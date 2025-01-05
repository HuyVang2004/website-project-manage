from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.comment import CommentCreate, CommentResponse, CommentUpdate
from app.services.comment_service import create_comment, get_comment_by_id, get_comments_by_task, update_comment, delete_comment
from app.db.session import get_db

router = APIRouter()

@router.post("/", response_model=CommentResponse)
def create_comment_endpoint(comment: CommentCreate, db: Session = Depends(get_db)):
    return create_comment(comment, db)

@router.get("/{comment_id}", response_model=CommentResponse)
def get_comment_endpoint(comment_id: str, db: Session = Depends(get_db)):
    comment = get_comment_by_id(comment_id, db)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment

@router.get("/task/{task_id}", response_model=list[CommentResponse])
def get_comments_by_task_endpoint(task_id: str, db: Session = Depends(get_db)):
    comments = get_comments_by_task(task_id, db)
    if not comments:
        raise HTTPException(status_code=404, detail="No comments found for this task")
    return comments

@router.put("/{comment_id}", response_model=CommentResponse)
def update_comment_endpoint(comment_id: str, comment_update: CommentUpdate, db: Session = Depends(get_db)):
    updated_comment = update_comment(comment_id, comment_update, db)
    if not updated_comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return updated_comment

@router.delete("/{comment_id}", response_model=dict)
def delete_comment_endpoint(comment_id: str, db: Session = Depends(get_db)):
    comment = delete_comment(comment_id, db)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return {"message": f"Comment with ID {comment_id} has been deleted successfully"}
