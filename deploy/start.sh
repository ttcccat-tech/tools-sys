#!/bin/bash

# 構建並啟動服務
echo "🚀 部署 Tools-Sys..."

# 構建並啟動容器
docker-compose up -d --build

echo "✅ 服務已啟動！"
echo "前端: http://localhost"
echo "後端 API: http://localhost/api"
echo ""
echo "預設管理員帳號: admin / admin"
