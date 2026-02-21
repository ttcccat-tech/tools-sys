# Tools-Sys 開發規範

## 🎯 專案目標

**專業開發者工具系統** - 簡潔、高效、模組化

---

## 📁 專案結構

```
tools-sys/
├── CLAUDE.md                    # 本文件（全局規則）
├── backend/                      # FastAPI 後端
│   ├── CLAUDE.md                # 後端開發規則
│   ├── main.py
│   ├── requirements.txt
│   └── ...
├── frontend/                     # React 前端
│   ├── CLAUDE.md                # 前端開發規則
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   └── Login.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── package.json
│   ├── vite.config.js
│   └── ...
└── deploy/                       # Docker 部署
    ├── Dockerfile
    ├── docker-compose.yaml
    └── nginx.conf
```

---

## 🔄 Git 工作流程

### 常用命令

```bash
# 查看狀態
git status

# 添加所有修改
git add .

# 提交（遵循規範）
git commit -m "type(scope): subject"

body

footer

# 推送到遠端
git push

# 拉取最新代碼
git pull
```

### 提交訊息規範

```
type(scope): subject

# 空行

body（可選）

# 空行

footer（可選）
```

#### type（類型）
- `feat`: 新功能
- `fix`: Bug 修復
- `docs`: 文件更新
- `refactor`: 重構（不改功能）
- `perf`: 性能優化
- `style`: 代碼風格調整
- `test`: 添加測試
- `chore`: 其他改動

#### scope（範圍）
- `frontend`: 前端相關
- `backend`: 後端相關
- `deploy`: 部署相關
- `docs`: 文檔相關
- `style`: 代碼風格

#### 範例

```
feat(frontend): 添加用戶登入頁面

實作登入表單和驗證邏輯。
整合 Tailwind CSS 組件樣式。

- 添加 Login.jsx 組件
- 更新 App.jsx 路由邏輯
- 設定登入/登出狀態管理

Co-Authored-By: Cat <cat@tools-sys.com>
```

---

## 🧪 開發環境

### 生產環境
- **前端**：http://localhost:3033/
- **後端**：http://localhost:3034/
- **Docker Compose**：`docker-compose.yaml`

### 測試環境
- **前端**：http://localhost:3033/
- **後端**：http://localhost:3034/
- **Docker Compose**：`docker-compose.test.yaml`

### 開發環境
- **前端**：`cd frontend && npm run dev` (端口：3000)
- **後端**：`cd backend && python -m uvicorn main:app --reload` (端口：8000)

---

## 📋 檢查清單

在提交代碼前，請確保：

### 代碼質量
- ✅ 代碼通過 ESLint 檢查
- ✅ 所有 console.log 已移除（除調試用）
- ✅ 無用的變數和函數已刪除
- ✅ 代碼格式一致（使用 Prettier）
- ✅ 適守項目命名規範

### 測試覆蓋
- ✅ 新功能有對應的測試用例
- ✅ 所有測試通過
- ✅ 無警告或錯誤訊息

### 文檔更新
- ✅ README.md 已更新（如有需要）
- ✅ API 文檔已更新（如有需要）
- ✅ 代碼註釋清晰明了
- ✅ 變更日誌已記錄

### 安全檢查
- ✅ 沒有硬編碼的密碼或金鑰
- ✅ 所有敏感數據使用環境變數
- ✅ 沒有已知的 CVE 漏洞
- ✅ 依賴包版本安全

---

## 🔍 代碼審查流程

### 自我審查清單

在提交前，問自己：

1. **功能性**：
   - 這個 PR/commit 能解決什麼問題？
   - 是否符合需求規範？
   - 是否有副作用？

2. **代碼質量**：
   - 代碼是否容易理解？
   - 是否有重複邏輯？
   - 是否遵循最佳實踐？

3. **性能**：
   - 是否會引入性能問題？
   - 是否有內存洩漏風險？
   - 是否有潛在的延遲問題？

4. **測試**：
   - 是否覆蓋所有邊界情況？
   - 是否有回歸測試？
   - 測試用例是否清晰？

---

## 📚 知識庫

### 技術文檔
- [React 官方文檔](https://react.dev/)
- [Tailwind CSS 文檔](https://tailwindcss.com/)
- [FastAPI 官方文檔](https://fastapi.tiangolo.com/)
- [Docker 官方文檔](https://docs.docker.com/)

### 項目指南
- [Python PEP 8](https://peps.python.org/pep-0008/)
- [React 樣程指南](https://react.dev/learn)
- [Google JavaScript 風格指南](https://google.github.io/styleguide/jsguide.html)

---

## 🚀 部署流程

### 開發環境 → 測試環境
```bash
# 1. 推送到 Git
git push

# 2. CI/CD 自動部署到測試環境
# 3. 在測試環境驗證功能
```

### 測試環境 → 生產環境
```bash
# 1. 在測試環境完成驗證
# 2. 標記版本為 stable
git tag -a v1.0.0 -m "Release version 1.0.0"

# 3. 推送到 Git
git push --tags

# 4. CI/CD 自動部署到生產環境
```

---

## 🆘 緊急修復流程

### 嚴重 Bug
1. 在 Hotfix 分支修復
2. 快速測試（跳過完整 QA）
3. 合併到 main 分支
4. 立即部署到生產環境

### 一般 Bug
1. 在 Feature 分支修復
2. 完整測試和 QA
3. 發起 PR 給團隊審查
4. 合併到 main 分支
5. 下一個部署週期部署

---

## 📈 監控和日誌

### 前端監控
- **Google Analytics**：用戶行為追蹤
- **Sentry**：錯誤日誌和性能監控
- **Lighthouse**：性能評分和 SEO

### 後端監控
- **應用性能監控（APM）**：New Relic / Datadog
- **日誌聚合**：ELK Stack (Elasticsearch, Logstash, Kibana)
- **Uptime 監控**：Uptime Robot / Pingdom

---

## 🔧 故障排除

### 常見問題

**1. Docker 構建失敗**
```bash
# 清理 Docker 快取
docker system prune -a

# 重新構建
docker compose build --no-cache
```

**2. 前端無法訪問後端 API**
```bash
# 檢查容器網絡
docker network inspect tools-sys-network

# 檢查 Nginx 配置
docker exec frontend nginx -t
```

**3. Git 推送被拒絕**
```bash
# 拉取最新代碼
git pull --rebase

# 解決衝突後再推送
git push
```

---

## 📞 聯繫方式

### 開發團隊
- **開發者**：Cat (cat@tools-sys.com)
- **老闆**：Terrence (terrence@tools-sys.com)
- **聯繫方式**：Telegram、Email、專案管理工具

### 開會時間
- **每週一**：15:00 (UTC+8) - 進度同步
- **每週五**：16:00 (UTC+8) - 發布準備
- **每週日**：臨時需要 - 緊急修復

---

## 🎓 學習與成長

### 技術債務
- [x] 基礎 Git 工作流
- [x] 基礎 Docker 操作
- [ ] 高級 Git Rebase 操作
- [ ] CI/CD 流程優化
- [ ] Kubernetes 部署

### 個人成長
- [ ] 代碼審查能力
- [ ] 技術文檔撰寫
- [ ] 團隊溝通技巧
- [ ] 項導開發能力

---

## 📝 版本控制策略

### 分支策略
- `main`: 生產環境分支
- `develop`: 開發主分支
- `feature/*`: 功能開發分支
- `bugfix/*`: Bug 修復分支
- `hotfix/*`: 緊急修復分支

### 版本號規範
遵循語義化版本：`MAJOR.MINOR.PATCH`
- `MAJOR`: 不兼容的 API 變更
- `MINOR`: 向後兼容的新功能
- `PATCH`: 向後兼容的 Bug 修復

範例：`1.0.0` → `1.1.0` → `2.0.0`

---

## 🔐 安全策略

### 密碼和金鑰管理
- ✅ 使用環境變數存儲敏感信息
- ✅ 永不提交密碼到 Git
- ✅ 使用 `.env` 文件並添加到 `.gitignore`
- ✅ 定期更換密碼和金鑰

### 依賴管理
- ✅ 定期更新依賴包
- ✅ 使用 `npm audit` 和 `pip-audit` 檢查漏洞
- ✅ 鎖定主要版本號避免意外破壞

---

## 🎯 項目路線圖

### 階段一（已完成）
- ✅ 專案架構設計
- ✅ 基礎開發環境搭建
- ✅ 前端登入頁面
- ✅ 基礎 Docker 部署

### 階段二（進行中）
- ⏳ 前端主要功能開發
- ⏳ 後端 API 開發
- ⏳ 用戶認證系統
- ⏳ 數據庫設計與實作

### 階段三（待規劃）
- ⏳ 高級功能開發
- ⏳ 性能優化
- ⏳ 安全加固
- ⏳ 企業版功能

---

## 📞 聯繫與支持

### 工作時間
- **平時**：週一至週五，09:00-18:00 (UTC+8)
- **週末**：臨時響應緊急問題
- **假日**：提前安排工作覆蓋

### 緊急聯繫
- **老闆手機**：[隱私保護]
- **老闆 Email**：[隱私保護]
- **緊急聯繫**：優先響應

---

## 📊 性能指標

### 前端性能目標
- **首屏加載時間 (FCP)**: < 1.5s
- **可交互時間 (TTI)**: < 3s
- **速度指標 (Lighthouse)**: > 90
- **包大小**: < 150KB (Gzip 後)

### 後端性能目標
- **API 響應時間**: < 100ms (P95)
- **併發處理能力**: > 1000 req/s
- **系統可用性**: > 99.9%
- **數據庫查詢優化**: < 10ms

---

## 🏆 總結

本規範文件旨在幫助團隊：
- 🔧 保持代碼質量
- 🚀 加速開發流程
- 📚 統一開發標準
- 🔐 確保系統安全
- 📈 持續改進性能

**記住：規範是為了幫助我們，不是束縛我們。在必要時，靈活調整！**

---

*最後更新：2026-02-21*
*維護者：Cat*
*版本：1.0.0*
