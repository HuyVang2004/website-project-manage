# services/notification_service.py

from sqlalchemy.orm import Session
from app.models.notification import Notification
from app.schemas.notification import NotificationCreate, NotificationUpdate
from app.db.session import get_db

def create_notification(notification: NotificationCreate, db: Session = next(get_db())):
    new_notification = Notification(**notification.dict())
    db.add(new_notification)
    db.commit()
    db.refresh(new_notification)
    return new_notification

def get_notification_by_id(notification_id: str, db: Session = next(get_db())):
    return db.query(Notification).filter(Notification.notification_id == notification_id).first()

def get_notifications_by_user(user_id: str, db: Session = next(get_db())):
    return db.query(Notification).filter(Notification.user_id == user_id).all()

def update_notification(notification_id: str, notification_update: NotificationUpdate, db: Session = next(get_db())):
    notification = db.query(Notification).filter(Notification.notification_id == notification_id).first()
    if not notification:
        return None
    for field, value in notification_update.dict(exclude_unset=True).items():
        setattr(notification, field, value)
    db.commit()
    db.refresh(notification)
    return notification

def delete_notification(notification_id: str, db: Session = next(get_db())):
    notification = db.query(Notification).filter(Notification.notification_id == notification_id).first()
    if not notification:
        return None
    db.delete(notification)
    db.commit()
    return notification
