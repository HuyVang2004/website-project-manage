# from itsdangerous import URLSafeTimedSerializer
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
from app.core.config import Settings

# Secret key và salt cho việc tạo token
# SECRET_KEY = "your-very-secure-secret-key"  # Thay bằng secret key mạnh mẽ của bạn
# SECURITY_SALT = "your-security-salt"       # Thêm một salt để tăng bảo mật

SECRET_KEY = Settings().secret_key
ALGORITHM = "HS256"


# Context dùng để băm và xác thực mật khẩu
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# pwd_context = CryptContext(
#     schemes=["argon2"],  # Sử dụng argon2 thay vì bcrypt
#     deprecated="auto"
# )

# --------------------------------------
# Mã hóa mật khẩu và xác thực mật khẩu
# --------------------------------------

def hash_password(password: str) -> str:
    """
    Hash một mật khẩu bằng bcrypt.
    """
    return pwd_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    """
    Xác thực mật khẩu với hash đã lưu.
    """
    return pwd_context.verify(password, hashed_password)

# --------------------------------------
# Tạo và xác minh token đặt lại mật khẩu
# --------------------------------------

def create_reset_token(data: dict, expires_delta: timedelta = timedelta(hours=1)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_reset_token(token: str):
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_token
    except JWTError:
        return None