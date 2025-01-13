import os

EXCLUDED_DIRS = {"build", "venv", "node_modules", "__pycache__", ".git", "database", "images"}

def list_structure(path, level=0):
    try:
        for entry in os.scandir(path):
            # Kiểm tra nếu là thư mục và không nằm trong danh sách loại trừ
            if entry.is_dir() and entry.name not in EXCLUDED_DIRS:
                print("  " * level + f"- [DIR] {entry.name}")
                list_structure(entry.path, level + 1)  # Đệ quy vào thư mục con
            # Nếu là tệp thì liệt kê
            elif entry.is_file():
                print("  " * level + f"- [FILE] {entry.name}")
    except PermissionError:
        # Bỏ qua các thư mục không có quyền truy cập
        print("  " * level + "- [ACCESS DENIED]")

# Đường dẫn gốc để bắt đầu
root_path = "C:\\Users\\User\\website-project-manage"
list_structure(root_path)
