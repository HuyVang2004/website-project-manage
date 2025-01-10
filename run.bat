@echo off
rem Kích hoạt môi trường ảo
call .\.venv\Scripts\activate

rem Di chuyển đến thư mục backend
cd .\backend\

rem Khởi chạy backend server
start /b uvicorn app.main:app --reload

rem Mở trang tài liệu API
start "" http://127.0.0.1:8000/docs

@REM rem Di chuyển đến thư mục frontend
cd ..\frontend

@REM rem Khởi chạy frontend
start /b npm start