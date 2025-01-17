from sqlalchemy.orm import Session
from app.models.help import Help
from app.schemas.help import HelpCreate, HelpUpdate
from app.db.session import get_db

def create_help(help: HelpCreate, db: Session = next(get_db())):
    new_help = Help(**help.dict(), is_replied=False)
    db.add(new_help)
    db.commit()
    db.refresh(new_help)
    return new_help

def get_help_by_id(help_id: str, db: Session = next(get_db())):
    return db.query(Help).filter(Help.help_id == help_id).first()

def get_help_by_user(user_id: str, db: Session = next(get_db())):
    return db.query(Help).filter(Help.user_id == user_id).all()

def get_all_helps(db: Session = next(get_db())):
    return db.query(Help).all()

def update_help(help_id: str, help_update: HelpUpdate, db: Session = next(get_db())):
    help_record = db.query(Help).filter(Help.help_id == help_id).first()
    if not help_record:
        return None
    for field, value in help_update.dict(exclude_unset=True).items():
        setattr(help_record, field, value)
    db.commit()
    db.refresh(help_record)
    return help_record

def delete_help(help_id: str, db: Session = next(get_db())):
    help_record = db.query(Help).filter(Help.help_id == help_id).first()
    if not help_record:
        return None
    db.delete(help_record)
    db.commit()
    return help_record
