from pydantic_settings import BaseSettings
from fastapi_mail import ConnectionConfig  # Nhập ConnectionConfig từ fastapi_mail

class Settings(BaseSettings):
    secret_key: str = "secret_key"
    
    # Cấu hình email sử dụng ConnectionConfig với các tham số đúng
    mail_config: ConnectionConfig = ConnectionConfig(
        MAIL_USERNAME="thanhtruongle477@gmail.com",
        MAIL_PASSWORD="gdtv ixom fxld lfnr",
        MAIL_FROM="thanhtruongle477@gmail.com",
        MAIL_PORT=587,
        MAIL_SERVER="smtp.gmail.com",
        MAIL_STARTTLS=True,  # Đảm bảo sử dụng MAIL_STARTTLS
        MAIL_SSL_TLS=False # Thêm tham số MAIL_SSL_TLS nếu cần
        # Loại bỏ TEMPLATE_FOLDER nếu bạn không có thư mục mẫu
    )

    class Config:
        env_file = ".env"
