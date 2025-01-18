# Sử dụng một base image node.js
FROM node:20

# Đặt thư mục làm việc bên trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json để cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép tất cả code vào container
COPY . .

# Build ứng dụng
RUN npm run build

# Sử dụng một server để phục vụ frontend (ví dụ: serve)
RUN npm install -g serve

# Cấu hình port và lệnh chạy
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
