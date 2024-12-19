import mysql.connector
from passlib.context import CryptContext


# Kết nối đến cơ sở dữ liệu trực tiếp từ DATABASE_URL
db = mysql.connector.connect(
    host='localhost',
    user='root',
    password='truong',
    database='project_manager_database'
)

cursor = db.cursor()

# Lấy tất cả mật khẩu chưa được băm
cursor.execute("SELECT user_id, password FROM users WHERE password NOT LIKE '$2b$%';")
users = cursor.fetchall()

# Duyệt qua từng người dùng và băm mật khẩu
for user_id, plain_password in users:
    hashed_password = bcrypt.hash(plain_password)  # Băm mật khẩu

    # Cập nhật lại cơ sở dữ liệu
    cursor.execute(
        "UPDATE users SET password = %s WHERE user_id = %s",
        (hashed_password, user_id)
    )
    print(f"Updated password for user_id: {user_id}")

# Lưu thay đổi vào cơ sở dữ liệu
db.commit()

# Đóng kết nối
cursor.close()
db.close()

print("All passwords have been hashed successfully!")
