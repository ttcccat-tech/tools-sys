#!/bin/bash

# 初始化資料庫
echo "🚀 部署 Tools-Sys..."

# 確保目錄存在
mkdir -p /app/db

# 初始化資料庫
python3 -c "
import sqlite3
import os

db_path = os.getenv('DB_PATH', '/app/db/tools.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# 建立使用者表
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_admin BOOLEAN DEFAULT 0,
    is_active BOOLEAN DEFAULT 1
)
''')

# 建立工具表
cursor.execute('''
CREATE TABLE IF NOT EXISTS tools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    version TEXT,
    route TEXT NOT NULL,
    icon TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
''')

# 建立預設管理員
cursor.execute('''
INSERT OR IGNORE INTO users (username, password_hash, is_admin)
VALUES ('admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 1)
''')

conn.commit()
conn.close()
print('✅ 資料庫初始化完成')
"

# 啟動 Nginx（在前台）
nginx -g 'daemon off;' &
sleep 1

# 啟動 FastAPI（在不同端口，避免與 Nginx 衝突）
cd /app
uvicorn main:app --host 0.0.0.0 --port 8000 &
sleep 1

echo "✅ 服務已啟動！"
echo "前端: http://localhost"
echo "後端 API: http://localhost/api"
echo ""
echo "預設管理員帳號: admin / admin"

# 保持容器運行
tail -f /dev/null
