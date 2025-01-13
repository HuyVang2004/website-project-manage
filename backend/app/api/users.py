from fastapi import APIRouter, HTTPException, Depends, File, UploadFile, Form
from sqlalchemy.orm import Session
from app.core.security import (hash_password, verify_password, create_access_token, 
                               create_refresh_token)
from app.core.dependencies import get_current_user
from app.schemas.user import UserCreateForUser, UserResponse, UserUpdate
from app.models.user import User
from app.db.session import get_db
from app.services.aws_s3_service import get_image_from_s3, upload_image_to_s3
from fastapi.responses import StreamingResponse
from fastapi_mail import FastMail, MessageSchema
from app.core.config import Settings
from datetime import datetime, timedelta
from sqlalchemy import and_
from app.models.password_reset_token import PasswordResetToken
from pydantic import BaseModel
from io import BytesIO
import random
import jwt

router = APIRouter()




class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "Bearer"

# Generate a numeric reset token
def generate_numeric_token(length=6):
    return "".join([str(random.randint(0, 9)) for _ in range(length)])

# Login endpoint to authenticate user with email and password
@router.post("/login", response_model=TokenResponse)
def login(email: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Tạo access và refresh token
    access_token = create_access_token({"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})

    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "Bearer"}


# @router.get("/me", response_model=UserResponse)
# def get_current_user_info(current_user: User = Depends(get_current_user)):
#     return current_user


# Get current user info
@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Truy xuất thông tin người dùng từ đối tượng `User`
    user = db.query(User).filter(User.email == current_user.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Refresh token endpoint
@router.post("/refresh-token", response_model=TokenResponse)
def refresh_token(refresh_token: str, db: Session = Depends(get_db)):
    payload = verify_access_token(refresh_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    user = db.query(User).filter(User.email == payload["sub"]).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    new_access_token = create_access_token({"sub": user.email})
    return {"access_token": new_access_token, "refresh_token": refresh_token, "token_type": "Bearer"}

# Register new user
@router.post("/register", response_model=UserResponse)
def register(user: UserCreateForUser, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)
    user_data = user.dict(exclude={'password'})
    new_user = User(**user_data, password=hashed_password, role="user")

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# Update user profile
@router.put("/update-profile", response_model=UserResponse)
def update_user_info(user_update: UserUpdate, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == current_user["sub"]).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    for key, value in user_update.dict(exclude_unset=True).items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return user

# Forgot password endpoint
@router.post("/forgot-password")
async def forgot_password(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    reset_token = generate_numeric_token()
    hashed_token = hash_password(reset_token)
    token_expiry = datetime.utcnow() + timedelta(minutes=10)

    token_entry = PasswordResetToken(token=hashed_token, email=email, expires_at=token_expiry)
    db.add(token_entry)
    db.commit()

    email_content = f"Use this code to reset your password: {reset_token}"
    message = MessageSchema(
        subject="Reset your password",
        recipients=[email],
        body=email_content,
        subtype="html",
    )

    fm = FastMail(Settings().mail_config)
    await fm.send_message(message)

    return {"message": "Reset password email sent successfully"}

# Reset password endpoint
@router.post("/reset-password")
def reset_password(token: str, new_password: str, db: Session = Depends(get_db)):
    token_entry = db.query(PasswordResetToken).filter(
        and_(PasswordResetToken.expires_at > datetime.utcnow())
    ).first()

    if not token_entry or not verify_password(token, token_entry.token):
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    user = db.query(User).filter(User.email == token_entry.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.password = hash_password(new_password)
    db.delete(token_entry)
    db.commit()

    return {"message": "Password reset successfully"}

# Upload image for user
@router.post("/upload-image")
async def upload_user_image(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid file type")

    upload_image_to_s3(current_user["sub"], file)
    return {"message": "Image uploaded successfully"}

# Get user image
@router.get("/get-image")
async def get_user_image(current_user: dict = Depends(get_current_user)):
    image_data = get_image_from_s3(current_user["sub"])
    if not image_data:
        raise HTTPException(status_code=404, detail="Image not found")

    return StreamingResponse(BytesIO(image_data), media_type="image/jpeg")


















# from fastapi import APIRouter, HTTPException, Depends, File, UploadFile
# from sqlalchemy.orm import Session
# from app.core.security import (hash_password, verify_password, create_access_token, 
#                                create_refresh_token)
# from app.core.dependencies import get_current_user
# from app.schemas.user import UserCreateForUser, UserResponse, UserUpdate
# from app.models.user import User
# from app.db.session import get_db
# from app.services.aws_s3_service import get_image_from_s3, upload_image_to_s3
# from fastapi.responses import StreamingResponse
# from fastapi_mail import FastMail, MessageSchema
# from app.core.config import Settings
# from datetime import datetime, timedelta
# from sqlalchemy import and_
# from app.models.password_reset_token import PasswordResetToken
# from pydantic import BaseModel
# from io import BytesIO
# import random
# import jwt

# router = APIRouter()

# class TokenResponse(BaseModel):
#     access_token: str
#     refresh_token: str
#     token_type: str = "Bearer"

# def generate_numeric_token(length=6):
#     return "".join([str(random.randint(0, 9)) for _ in range(length)])

# @router.post("/login", response_model=TokenResponse)
# def login(email: str, password: str, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.email == email).first()
#     if not user or not verify_password(password, user.password):
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     access_token = create_access_token({"sub": user.email})
#     refresh_token = create_refresh_token({"sub": user.email})

#     return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "Bearer"}

# @router.post("/refresh-token", response_model=TokenResponse)
# def refresh_token(refresh_token: str, db: Session = Depends(get_db)):
#     payload = verify_access_token(refresh_token)
#     if not payload:
#         raise HTTPException(status_code=401, detail="Invalid refresh token")

#     user = db.query(User).filter(User.email == payload["sub"]).first()
#     if not user:
#         raise HTTPException(status_code=401, detail="Invalid refresh token")

#     new_access_token = create_access_token({"sub": user.email})
#     return {"access_token": new_access_token, "refresh_token": refresh_token, "token_type": "Bearer"}

# @router.post("/register", response_model=UserResponse)
# def register(user: UserCreateForUser, db: Session = Depends(get_db)):
#     # Check if the email is already registered
#     if db.query(User).filter(User.email == user.email).first():
#         raise HTTPException(status_code=400, detail="Email already registered")

#     # Hash the password before saving it
#     hashed_password = hash_password(user.password)

#     # Use user.dict() and exclude the password field since we handle it separately
#     user_data = user.dict(exclude={'password'})  # Exclude password here

#     # Create the new user with the hashed password and default role
#     new_user = User(**user_data, password=hashed_password, role="user")

#     # Add, commit, and refresh the new user in the database
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)

#     return new_user



# @router.get("/me", response_model=UserResponse)
# def get_current_user_info(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.email == current_user["sub"]).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     return user

# @router.put("/update-profile", response_model=UserResponse)
# def update_user_info(user_update: UserUpdate, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.email == current_user["sub"]).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     for key, value in user_update.dict(exclude_unset=True).items():
#         setattr(user, key, value)

#     db.commit()
#     db.refresh(user)
#     return user

# @router.post("/forgot-password")
# async def forgot_password(email: str, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.email == email).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     reset_token = generate_numeric_token()
#     hashed_token = hash_password(reset_token)
#     token_expiry = datetime.utcnow() + timedelta(minutes=10)

#     token_entry = PasswordResetToken(token=hashed_token, email=email, expires_at=token_expiry)
#     db.add(token_entry)
#     db.commit()

#     email_content = f"Use this code to reset your password: {reset_token}"
#     message = MessageSchema(
#         subject="Reset your password",
#         recipients=[email],
#         body=email_content,
#         subtype="html",
#     )

#     fm = FastMail(Settings().mail_config)
#     await fm.send_message(message)

#     return {"message": "Reset password email sent successfully"}

# @router.post("/reset-password")
# def reset_password(token: str, new_password: str, db: Session = Depends(get_db)):
#     token_entry = db.query(PasswordResetToken).filter(
#         and_(PasswordResetToken.expires_at > datetime.utcnow())
#     ).first()

#     if not token_entry or not verify_password(token, token_entry.token):
#         raise HTTPException(status_code=400, detail="Invalid or expired token")

#     user = db.query(User).filter(User.email == token_entry.email).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     user.password = hash_password(new_password)
#     db.delete(token_entry)
#     db.commit()

#     return {"message": "Password reset successfully"}

# @router.post("/upload-image")
# async def upload_user_image(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
#     if file.content_type not in ["image/jpeg", "image/png"]:
#         raise HTTPException(status_code=400, detail="Invalid file type")

#     upload_image_to_s3(current_user["sub"], file)
#     return {"message": "Image uploaded successfully"}

# @router.get("/get-image")
# async def get_user_image(current_user: dict = Depends(get_current_user)):
#     image_data = get_image_from_s3(current_user["sub"])
#     if not image_data:
#         raise HTTPException(status_code=404, detail="Image not found")

#     return StreamingResponse(BytesIO(image_data), media_type="image/jpeg")