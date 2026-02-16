# 前端 - Vite + React
FROM node:20-alpine AS frontend

WORKDIR /app

# 安裝依賴
COPY frontend/package*.json ./
RUN npm install

# 製製源碼
COPY frontend/ .

# 構建並保持 dist 目錄
RUN npm run build && ls -la dist/

# Nginx - 服務前端
FROM nginx:alpine AS frontend-server

# 複製構建產物（相對路徑，因為 frontend 階段的 WORKDIR 是 /app）
COPY --from=frontend /app/dist /usr/share/nginx/html

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# ===== 後端 - FastAPI =====
FROM python:3.11-slim AS backend

WORKDIR /app

# 安裝依賴
COPY backend-gateway/api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 複製源碼
COPY backend-gateway/ .

# 初始化資料庫
COPY db/init.sh .
RUN chmod +x init.sh && ./init.sh

EXPOSE 8000

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
