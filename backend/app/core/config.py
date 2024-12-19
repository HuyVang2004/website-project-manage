from fastapi_mail import ConnectionConfig

class Settings:
    MAIL_USERNAME = "your-email@example.com"  # Thay đổi thành email thật
    MAIL_PASSWORD = "your-email-password"  # Mật khẩu của email
    MAIL_FROM = "your-email@example.com"  # Địa chỉ email gửi
    MAIL_PORT = 587  # Cổng SMTP (thường là 587 cho TLS)
    MAIL_SERVER = "smtp.example.com"  # Máy chủ SMTP (ví dụ: smtp.gmail.com cho Gmail)
    MAIL_TLS = True  # Kết nối bảo mật TLS
    MAIL_SSL = False  # Không sử dụng SSL
    FRONTEND_URL = "http://localhost:3000"  # URL của frontend nơi người dùng có thể đặt lại mật khẩu
