from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.activity_log import ActivityLogCreate, ActivityLogResponse, ActivityLogUpdate
from app.services.activity_log_service import create_activity_log, get_activity_log_by_id, get_activity_logs_by_user, update_activity_log, delete_activity_log
from app.db.session import get_db

router = APIRouter()

@router.post("/", response_model=ActivityLogResponse)
def create_activity_log_endpoint(activity_log: ActivityLogCreate, db: Session = Depends(get_db)):
    return create_activity_log(activity_log, db)

@router.get("/{act_id}", response_model=ActivityLogResponse)  
def get_activity_log_endpoint(act_id: str, db: Session = Depends(get_db)):  
    activity_log = get_activity_log_by_id(act_id, db)  
    if not activity_log:
        raise HTTPException(status_code=404, detail="Activity log not found")
    return activity_log

@router.get("/user/{user_id}", response_model=list[ActivityLogResponse])
def get_activity_logs_by_user_endpoint(user_id: str, db: Session = Depends(get_db)):
    activity_logs = get_activity_logs_by_user(user_id, db)
    if not activity_logs:
        raise HTTPException(status_code=404, detail="No activity logs found for this user")
    return activity_logs

@router.put("/{act_id}", response_model=ActivityLogResponse) 
def update_activity_log_endpoint(act_id: str, activity_log_update: ActivityLogUpdate, db: Session = Depends(get_db)): 
    updated_activity_log = update_activity_log(act_id, activity_log_update, db)  
    if not updated_activity_log:
        raise HTTPException(status_code=404, detail="Activity log not found")
    return updated_activity_log

@router.delete("/{act_id}", response_model=dict)  
def delete_activity_log_endpoint(act_id: str, db: Session = Depends(get_db)):  
    activity_log = delete_activity_log(act_id, db)
    if not activity_log:
        raise HTTPException(status_code=404, detail="Activity log not found")
    return {"message": f"Activity log with ID {act_id} has been deleted successfully"}

@router.get("/", response_model=list[ActivityLogResponse])
def get_all_activity_logs_endpoint(db: Session = Depends(get_db)):
    activity_logs = db.query(ActivityLog).all()  # Assuming ActivityLog is your model
    if not activity_logs:
        raise HTTPException(status_code=404, detail="No activity logs found")
    return activity_logs

