from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.notification import NotificationCreate, NotificationResponse, NotificationUpdate
from app.services.notification_service import create_notification, get_notification_by_id, get_notifications_by_user, update_notification, delete_notification
from app.db.session import get_db

router = APIRouter()

@router.post("/", response_model=NotificationResponse)
def create_notification_endpoint(notification: NotificationCreate, db: Session = Depends(get_db)):
    return create_notification(notification, db)

@router.get("/{notification_id}", response_model=NotificationResponse)
def get_notification_endpoint(notification_id: str, db: Session = Depends(get_db)):
    notification = get_notification_by_id(notification_id, db)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification

@router.get("/user/{user_id}", response_model=list[NotificationResponse])
def get_notifications_by_user_endpoint(user_id: str, db: Session = Depends(get_db)):
    notifications = get_notifications_by_user(user_id, db)
    if not notifications:
        raise HTTPException(status_code=404, detail="No notifications found for this user")
    return notifications

@router.put("/{notification_id}", response_model=NotificationResponse)
def update_notification_endpoint(notification_id: str, notification_update: NotificationUpdate, db: Session = Depends(get_db)):
    updated_notification = update_notification(notification_id, notification_update, db)
    if not updated_notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return updated_notification

@router.delete("/{notification_id}", response_model=dict)
def delete_notification_endpoint(notification_id: str, db: Session = Depends(get_db)):
    notification = delete_notification(notification_id, db)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"message": f"Notification with ID {notification_id} has been deleted successfully"}
