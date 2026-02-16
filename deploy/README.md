# Tools-Sys 部署指南

## 快速開始

```bash
cd deploy
chmod +x start.sh
./start.sh
```

## 服務端點

| 服務 | 端口 | 網址 |
|------|------|------|
| 前端 | 80 | http://localhost |
| 後端 API | 8000 | http://localhost/api |

## 預設帳號

- **管理員帳號**: `admin` / `admin`
- **資料庫位置**: `./db/tools.db`

## 手動部署

```bash
# 構建並啟動
docker-compose up -d --build

# 查看日誌
docker-compose logs -f

# 停止服務
docker-compose down

# 停止並清除數據
docker-compose down -v
```

## 生產環境建議

1. **修改 SECRET_KEY**
   ```yaml
   environment:
     - SECRET_KEY=your-secure-random-key-here
   ```

2. **配置 HTTPS**
   - 使用 Nginx 或 Traefik 作為反向代理
   - 配置 SSL 憑證

3. **資料庫持久化**
   ```yaml
   volumes:
     - ./db:/app/db
   ```

4. **日誌管理**
   ```yaml
   services:
     backend:
       logging:
         driver: "json-file"
         options:
           max-size: "10m"
           max-file: "3"
   ```

## 故障排除

### 無法啟動容器
```bash
# 清理舊容器
docker-compose down -v

# 重新構建
docker-compose build --no-cache

# 啟動
docker-compose up -d
```

### 查看容器日誌
```bash
docker-compose logs frontend
docker-compose logs backend
```

### 進入容器除錯
```bash
# 進入後端容器
docker-compose exec backend bash

# 進入前端容器
docker-compose exec frontend sh
```
