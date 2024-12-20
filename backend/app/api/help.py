from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.help import HelpCreate, HelpResponse, HelpUpdate
from app.services.help_service import create_help, get_help_by_id, get_help_by_user, update_help, delete_help
from app.db.session import get_db

router = APIRouter()

@router.post("/", response_model=HelpResponse)
def create_help_endpoint(help: HelpCreate, db: Session = Depends(get_db)):
    return create_help(help, db)

@router.get("/{help_id}", response_model=HelpResponse)
def get_help_by_id_endpoint(help_id: str, db: Session = Depends(get_db)):
    help_record = get_help_by_id(help_id, db)
    if not help_record:
        raise HTTPException(status_code=404, detail="Help not found")
    return help_record

@router.get("/user/{user_id}", response_model=list[HelpResponse])
def get_help_by_user_endpoint(user_id: str, db: Session = Depends(get_db)):
    help_records = get_help_by_user(user_id, db)
    if not help_records:
        raise HTTPException(status_code=404, detail="No help records found for this user")
    return help_records

@router.put("/{help_id}", response_model=HelpResponse)
def update_help_endpoint(help_id: str, help_update: HelpUpdate, db: Session = Depends(get_db)):
    updated_help = update_help(help_id, help_update, db)
    if not updated_help:
        raise HTTPException(status_code=404, detail="Help not found")
    return updated_help

@router.delete("/{help_id}", response_model=dict)
def delete_help_endpoint(help_id: str, db: Session = Depends(get_db)):
    help_record = delete_help(help_id, db)
    if not help_record:
        raise HTTPException(status_code=404, detail="Help not found")
    return {"message": f"Help with ID {help_id} has been deleted successfully"}
