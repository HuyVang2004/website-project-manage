# from itsdangerous import URLSafeTimedSerializer
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
from app.core.config import Settings

# Secret key và salt cho việc tạo token
SECRET_KEY = "your-very-secure-secret-key"  # Thay bằng secret key mạnh mẽ của bạn
SECURITY_SALT = "your-security-salt"       # Thêm một salt để tăng bảo mật

# Context dùng để băm và xác thực mật khẩu
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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

def create_reset_token(email: str) -> str:
    """
    Tạo một token đặt lại mật khẩu cho email.
    """
    serializer = URLSafeTimedSerializer(SECRET_KEY)
    return serializer.dumps(email, salt=SECURITY_SALT)


def verify_reset_token(token: str, max_age: int = 3600) -> str:
    """
    Xác minh token đặt lại mật khẩu.
    - max_age: Thời gian hiệu lực của token (tính bằng giây).
    """
    serializer = URLSafeTimedSerializer(SECRET_KEY)
    try:
        email = serializer.loads(token, salt=SECURITY_SALT, max_age=max_age)
        return email
    except Exception as e:
        raise ValueError("Invalid or expired token") from e

# def create_access_token(data: dict, expires_delta: timedelta = None):
#     if expires_delta is None:
#         expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     expire = datetime.utcnow() + expires_delta
#     to_encode = data.copy()
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# # Xác thực access token
# def verify_token(token: str):
#     try:
#         # Giải mã token và lấy thông tin người dùng từ payload
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         role: str = payload.get("role")  # Lấy thông tin role từ token

#         if username is None or role is None:
#             raise Exception("Invalid token")

#         return {"username": username, "role": role}  # Trả về username và role
#     except jwt.ExpiredSignatureError:
#         raise Exception("Token has expired")
#     except jwt.JWTError:
#         raise Exception("Invalid token")