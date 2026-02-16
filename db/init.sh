#!/bin/bash

# 初始化資料庫
cd /home/user/repo/tools-sys/db
sqlite3 tools.db < schema.sql

# 建立預設管理員
PASSWORD_HASH=$(echo -n "admin" | sha256sum | cut -d' ' -f1)
sqlite3 tools.db "INSERT INTO users (username, password_hash, is_admin) VALUES ('admin', '$PASSWORD_HASH', 1);"

echo "資料庫初始化完成"
echo "預設帳號：admin / admin"
