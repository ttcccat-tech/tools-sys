# Tools-Sys - 開發者工具系統

一個簡潔俐落的前後端工具系統，採用工程師風格設計。

## 專案架構

```
tools-sys/
├── frontend/          # 前端工具介面
│   ├── login/       # 登入頁面
│   └── cards/       # 牌卡工具頁面
├── backend-gateway/  # 前端管理後台
│   ├── admin/       # 管理員介面
│   └── api/         # API 服務
├── db/              # 資料庫
│   └── init.sql     # 資料庫初始化
├── deploy/          # 部署配置
│   ├── Dockerfile
│   └── docker-compose.yaml
└── README.md
```

## 技術棧

- **前端**：Vue.js + Tailwind CSS
- **後端**：Flask + SQLite
- **認證**：JWT
- **部署**：Docker + Docker Compose

## 開發規範

### API 回傳格式
```json
{
  "status": "success",
  "data": { ... }
}
```

### 錯誤回傳格式
```json
{
  "status": "error",
  "message": "錯誤訊息"
}
```

## 部署說明

```bash
cd deploy
docker-compose up -d
```
