------------

  website-fullstack/  
  ├── backend/  
  │   ├── app/  
  │   │   ├── main.py          # Khởi chạy API  
  │   │   ├── models/          # Các model dữ liệu  
  │   │   ├── routers/         # Các router cho API  
  │   │   ├── schemas/         # C định nghĩa dữ liệu  
  │   │   ├── crud/            # Các chức năng CRUD  
  │   │   └── config.py        # Cấu hình FastAPI và các thông số môi trường  
  │   ├── requirements.txt      
  │   └── Dockerfile           
  ├── frontend/  
  │   ├── public/              # Các tài nguyên tĩnh như HTML, favicon, etc.  
  │   ├── src/  
  │   │   ├── components/      # Các component React  
  │   │   ├── pages/           # Các trang trong ứng dụng React  
  │   │   ├── services/        # Các service giao tiếp với backend (API calls)  
  │   │   ├── App.js           # Entry point của React  
  │   │   ├── index.js         # Bootstrap ứng dụng React  
  │   │   └── styles/          # Các file CSS/SCSS cho styling  
  │   ├── .env                 # Các biến môi trường cho frontend  
  │   ├── package.json         # Các dependencies của React  
  │   └── Dockerfile          
  │
  ├── docker-compose.yml     
  ├── README.md              

------------
