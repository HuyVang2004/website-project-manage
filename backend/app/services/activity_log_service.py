# services/activity_log_service.py

from sqlalchemy.orm import Session
from app.models.activity_log import ActivityLog
from app.schemas.activity_log import ActivityLogCreate, ActivityLogUpdate
from app.db.session import get_db

def create_activity_log(activity_log: ActivityLogCreate, db: Session = next(get_db())):
    new_activity_log = ActivityLog(**activity_log.dict())
    db.add(new_activity_log)
    db.commit()
    db.refresh(new_activity_log)
    return new_activity_log

def get_activity_log_by_id(log_id: str, db: Session = next(get_db())):
    return db.query(ActivityLog).filter(ActivityLog.log_id == log_id).first()

def get_activity_logs_by_user(user_id: str, db: Session = next(get_db())):
    return db.query(ActivityLog).filter(ActivityLog.user_id == user_id).all()

def update_activity_log(log_id: str, activity_log_update: ActivityLogUpdate, db: Session = next(get_db())):
    activity_log = db.query(ActivityLog).filter(ActivityLog.log_id == log_id).first()
    if not activity_log:
        return None
    for field, value in activity_log_update.dict(exclude_unset=True).items():
        setattr(activity_log, field, value)
    db.commit()
    db.refresh(activity_log)
    return activity_log

def delete_activity_log(log_id: str, db: Session = next(get_db())):
    activity_log = db.query(ActivityLog).filter(ActivityLog.log_id == log_id).first()
    if not activity_log:
        return None
    db.delete(activity_log)
    db.commit()
    return activity_log
