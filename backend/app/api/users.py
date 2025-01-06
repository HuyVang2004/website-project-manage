# api/users.py
from fastapi import APIRouter, HTTPException, Depends, File, UploadFile
from sqlalchemy.orm import Session
from app.core.security import hash_password, verify_password, create_reset_token, verify_reset_token
from app.schemas.user import UserCreateForUser, UserResponse, UserUpdate
from app.models.user import User
from app.db.session import get_db
from app.services.user_service import reset_password
from fastapi_mail import FastMail, MessageSchema
from app.core.config import Settings 

from datetime import datetime, timedelta
from sqlalchemy import and_
from app.models.password_reset_token import PasswordResetToken

import random
from app.services.aws_s3_service import get_image_from_s3, upload_image_to_s3

from fastapi.responses import StreamingResponse
from io import BytesIO

router = APIRouter()


@router.post("/upload-image/{user_id}")
async def upload_user_image(user_id: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    """
    API to upload an image for a user. The image will be renamed to user_id.jpg
    and uploaded to AWS S3 under the 'avatar/' folder.
    """
    try:
        # Call the service to upload the image to AWS S3 and rename it to user_id.jpg
        upload_image_to_s3(user_id, file)

        # Update the user's profile_picture path in the database (optional)
        user = db.query(User).filter(User.user_id == user_id).first()
        if user:
            user.profile_picture = f"avatar/{user_id}.jpg"  # Update the profile picture field
            db.commit()
            db.refresh(user)
            return {"message": "Image uploaded successfully", "user": user}
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error uploading image: {str(e)}")

@router.get("/get-image/{user_id}")
async def get_user_image(user_id: str):
    image_data = get_image_from_s3(user_id)  # Fetch image data from S3 (user or default)

    # Return the image as a StreamingResponse
    return StreamingResponse(BytesIO(image_data), media_type="image/jpeg")

# User registration
@router.post("/register", response_model=UserResponse)
def create_user_with_default_role(user: UserCreateForUser, db: Session = Depends(get_db)):
    hashed_password = hash_password(user.password)
    user_data = user.dict()
    user_data["password"] = hashed_password
    user_data["role"] = "user"

    new_user = User(**user_data)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# User login
# @router.post("/login", response_model=UserResponse)
# def login(username: str, password: str, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.username == username).first()
#     if not user or not verify_password(password, user.password):
#         raise HTTPException(status_code=401, detail="Invalid credentials")
#     return user

@router.post("/login", response_model=UserResponse)
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user

# Get user info
@router.get("/get-user-info/{user_id}", response_model=UserResponse)
def get_user_by_id(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Update user info
@router.put("/update-user-info/{user_id}", response_model=UserResponse)
def update_user_info(user_id: str, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = user_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return user

# Change password
@router.put("/change-password/{user_id}")
def change_password(user_id: str, old_password: str, new_password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(old_password, user.password):
        raise HTTPException(status_code=400, detail="Old password is incorrect")

    user.password = hash_password(new_password)
    db.commit()
    return {"message": "Password updated successfully"}



def generate_numeric_token(length=6):
    """Sinh token ngắn dạng số."""
    return "".join([str(random.randint(0, 9)) for _ in range(length)])


@router.post("/forgot-password")
async def forgot_password(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Sinh token ngắn hạn (6 chữ số)
    reset_token = generate_numeric_token(length=6)
    token_expiry = datetime.utcnow() + timedelta(minutes=10)  # Token hết hạn sau 10 phút

    # Lưu token vào cơ sở dữ liệu
    token_entry = PasswordResetToken(token=reset_token, email=user.email, expires_at=token_expiry)
    db.add(token_entry)
    db.commit()

    email_content = f"Click the link to reset your password: http://example.com/reset-password?token={reset_token}"

    message = MessageSchema(
        subject="Reset your password",
        recipients=[user.email],
        body=email_content,
        subtype="html",
    )

    fm = FastMail(Settings().mail_config)
    await fm.send_message(message)

    return {"message": "Reset password email sent successfully"}



# API xác minh token
@router.post("/verify-token")
def verify_reset_token_endpoint(token: str, db: Session = Depends(get_db)):
    # Kiểm tra token trong cơ sở dữ liệu
    token_entry = db.query(PasswordResetToken).filter(
        and_(
            PasswordResetToken.token == token,
            PasswordResetToken.expires_at > datetime.utcnow()  # Token chưa hết hạn
        )
    ).first()

    if not token_entry:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    # Token hợp lệ
    return {"message": "Token is valid"}


#nhập user_id và mk mới 
@router.post("/reset-password")
def reset_password_endpoint(user_id: str, new_password: str, db: Session = Depends(get_db)):
    # Tìm người dùng theo user_id
    user = db.query(User).filter(User.user_id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Cập nhật mật khẩu mới
    user.password = hash_password(new_password)
    db.commit()

    return {"message": "Password reset successfully"}




# # nhập token và mk mới 
# @router.post("/reset-password")
# def reset_password_endpoint(token: str, new_password: str, db: Session = Depends(get_db)):
#     # Kiểm tra token trong cơ sở dữ liệu
#     token_entry = db.query(PasswordResetToken).filter(
#         and_(
#             PasswordResetToken.token == token,
#             PasswordResetToken.expires_at > datetime.utcnow()  # Token chưa hết hạn
#         )
#     ).first()

#     if not token_entry:
#         raise HTTPException(status_code=400, detail="Invalid or expired token")

#     # Lấy email từ token và cập nhật mật khẩu
#     email = token_entry.email
#     user = db.query(User).filter(User.email == email).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     # Cập nhật mật khẩu mới
#     user.password = hash_password(new_password)
#     db.commit()

#     # Xóa token sau khi sử dụng
#     db.delete(token_entry)
#     db.commit()

#     return {"message": "Password reset successfully"}
