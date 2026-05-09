# GitHub 推送变更日志

每次执行 **`git push`** 到 **`origin`**（默认分支 **`main`**）后，请追加一节：**日期、提交区间、摘要清单**。便于多设备同步与回顾。

---

## 2026-05-09

### Push：路由与原型资产（`d37a325`）

**区间：** `5edf35e..d37a325` → `main`

**摘要：**

- **前端：** 按说明书 §5.5 与 `认定工作原型图/common.js` 对齐路由与侧栏（任务管理 / 认定流程 / 物料库；任务档案挂在任务管理下）；新增通用占位页 `PlaceholderPage.vue`；`App.vue` 改为由路由挂载 `BasicLayout`。
- **文档与资产：** 新增 `docs/Git操作指南.md`；更新 `开发周历-每周进展.md`、根目录《职业技能认定管理系统-详细需求规格说明书》；纳入 **`认定工作原型图/`** 全套原型页与 `common.css`、`common.js`。

---

### Push：本机加密盘环境下前端可启动（`85fff27`）

**区间：** `d37a325..85fff27` → `main`

**摘要：**

- **`frontend/package.json`：** `dev` / `build` / `preview` 改为使用 `node ./node_modules/vite/bin/vite.js` 调用 Vite，避免 Windows 下损坏的 `node_modules/.bin/*.cmd` 垫片导致命令乱码。
- **`frontend/vite.config.ts`：** 设置 `optimizeDeps.noDiscovery: true`，跳过开发期依赖预构建，规避公司加密盘上 esbuild 读 `node_modules` 时出现 `Unexpected "\x88"` 的问题（冷启动可能略慢；生产构建仍建议在正常磁盘验证 `npm run build`）。

---

## 维护说明（每次 push 后）

1. 用 **`git log origin/main -1 --oneline`**（或推送成功提示里的区间）确认最新提交。
2. 在本文件 **上方紧接「分隔线」之上** 插入新小节（新日期或同日追加小节）。
3. 摘要建议包含：**涉及目录、用户可见行为、配置/环境注意事项**，无需粘贴完整 diff。
