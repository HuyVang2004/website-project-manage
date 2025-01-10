import mysql.connector

import bcrypt

from passlib.context import CryptContext

# Tạo context để băm mật khẩu
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Kết nối đến cơ sở dữ liệu
db = mysql.connector.connect(
    host='localhost',
    user='root',

    # password='Thach2003',
    # database='project_database'

    password='truong',
    database='web_database'

)

cursor = db.cursor()

try:
    # Lấy tất cả mật khẩu chưa được băm
    cursor.execute("SELECT user_id, password FROM users WHERE password NOT LIKE '$2b$%';")
    users = cursor.fetchall()


# Duyệt qua từng người dùng và băm mật khẩu
    for user_id, plain_password in users:
        # Chuyển mật khẩu từ string sang bytes
        plain_password_bytes = plain_password.encode('utf-8')
        
        # Tạo salt và băm mật khẩu
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(plain_password_bytes, salt)
        
        # Chuyển hashed_password từ bytes sang string để lưu vào cơ sở dữ liệu
        hashed_password_str = hashed_password.decode('utf-8')

        # Cập nhật lại cơ sở dữ liệu
        cursor.execute(
            "UPDATE users SET password = %s WHERE user_id = %s",
            (hashed_password_str, user_id)
        )
        print(f"Updated password for user_id: {user_id}")

        # Duyệt qua từng người dùng và băm mật khẩu
        for user_id, plain_password in users:
            try:
                hashed_password = pwd_context.hash(plain_password)  # Băm mật khẩu

                # Cập nhật lại cơ sở dữ liệu
                cursor.execute(
                    "UPDATE users SET password = %s WHERE user_id = %s",
                    (hashed_password, user_id)
                )
                print(f"Updated password for user_id: {user_id}")
            except Exception as e:
                print(f"Error hashing password for user_id {user_id}: {e}")


        # Lưu thay đổi vào cơ sở dữ liệu
        db.commit()

finally:
    # Đóng kết nối
    cursor.close()
    db.close()

print("All passwords have been hashed successfully!")



# import mysql.connector
# import bcrypt

# # Tạo context để băm mật khẩu
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# # Kết nối đến cơ sở dữ liệu
# db = mysql.connector.connect(
#     host='localhost',
#     user='root',
#     password='2694',
#     database='csdl'
# )

# cursor = db.cursor()

# try:
#     # Lấy tất cả mật khẩu chưa được băm
#     cursor.execute("SELECT user_id, password FROM users WHERE password NOT LIKE '$2b$%';")
#     users = cursor.fetchall()


#     # Duyệt qua từng người dùng và băm mật khẩu
#     for user_id, plain_password in users:
#         try:
#             hashed_password = pwd_context.hash(plain_password)  # Băm mật khẩu

#             # Cập nhật lại cơ sở dữ liệu
#             cursor.execute(
#                 "UPDATE users SET password = %s WHERE user_id = %s",
#                 (hashed_password, user_id)
#             )
#             print(f"Updated password for user_id: {user_id}")
#         except Exception as e:
#             print(f"Error hashing password for user_id {user_id}: {e}")

#     # Lưu thay đổi vào cơ sở dữ liệu
#     db.commit()

# finally:
#     # Đóng kết nối
#     cursor.close()
#     db.close()

# print("All passwords have been hashed successfully!")