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
# Nginx 運行階段 (前端服務器 + 反向代理)
# ==========================================
FROM nginx:alpine AS tools-sys-full

WORKDIR /app

# 安裝必要的工具
RUN apk add --no-cache curl

# 設置工作目錄
RUN rm -rf /usr/share/nginx/html

# 複製前端構建產物
COPY --from=frontend-build /app/dist /usr/share/nginx/html

# 複製 Nginx 配置
COPY deploy/nginx-full.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]

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
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 複製源代碼
COPY backend/ .

# 初始化數據庫
RUN sqlite3 /app/db/tools.db "VACUUM;" || echo "數據庫初始化完成"

# ==========================================
# 後端運行階段
# ==========================================
FROM python:3.12-slim AS backend-runtime

WORKDIR /app

# 複製依賴和應用
COPY --from=backend-build /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=backend-build /app /app

# 暴露端口
EXPOSE 8000

# 啟動後端（作為 Nginx 的上游服務）
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
