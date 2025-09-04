# Sử dụng Node.js base image
FROM node:20

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json trước (để cache layer cài dependency)
COPY package*.json ./

# Cài đặt dependencies
RUN npm install
RUN npm install -g nodemon
RUN npm install multer
RUN npm install --save-dev @types/multer


# Copy toàn bộ source code vào container
COPY . .

# Expose port ứng dụng
EXPOSE 3000

# Lệnh chạy ứng dụng
CMD ["npm", "run", "dev"]

