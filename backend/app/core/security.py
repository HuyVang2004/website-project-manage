from itsdangerous import URLSafeTimedSerializer
from passlib.context import CryptContext

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
