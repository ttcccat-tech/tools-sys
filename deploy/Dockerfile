# ==========================================
# 前端構建階段 (Vite + React)
# ==========================================
FROM node:20-alpine AS frontend-build

WORKDIR /app

# 安裝所有依賴（包括 devDependencies）
COPY frontend/package*.json ./
RUN npm install

# 複製源代碼
COPY frontend/ .

# 構建前端應用
RUN npm run build

# ==========================================
# 後端構建階段 (FastAPI + Python)
# ==========================================
FROM python:3.12-slim AS backend-build

WORKDIR /app

# 安裝系統依賴
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 複製依賴文件
COPY backend-gateway/api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 複製源代碼
COPY backend-gateway/api/ .

# ==========================================
# 全棧運行階段 (Nginx + FastAPI)
# ==========================================
FROM python:3.12-slim AS tools-sys-full

WORKDIR /app

# 安裝 Nginx
RUN apt-get update && apt-get install -y \
    nginx \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 安裝 Python 依賴
COPY backend-gateway/api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 複製後端源代碼
COPY backend-gateway/api/ .

# 複製前端構建產物
COPY --from=frontend-build /app/dist /usr/share/nginx/html

# 複製 Nginx 配置
COPY deploy/nginx-full.conf /etc/nginx/conf.d/default.conf

# 初始化數據庫目錄
RUN mkdir -p /app/db
COPY db/schema.sql /app/db/schema.sql

# 暴露端口
EXPOSE 80

# 啟動腳本
COPY deploy/start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
