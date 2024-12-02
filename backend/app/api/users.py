from fastapi import APIRouter, HTTPException
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import create_user, get_user_by_id

router = APIRouter()

@router.post("/", response_model=UserResponse)
def create_user_endpoint(user: UserCreate):
    return create_user(user)

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: str):
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
