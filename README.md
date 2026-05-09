# SkillVerify — 职业技能认定管理系统（骨架）

单体仓库：**Vue 3 + Vite** 前端，`backend` **Spring Boot 3 + MyBatis-Plus + Flyway + MySQL**，与本仓库《职业技能认定管理系统-详细需求规格说明书》及《开发周历-每周进展》对齐演进。

## 环境要求

- **JDK 17+**
- **Maven 3.9+**
- **Node.js 20+**（含 npm）
- **MySQL 8**（二选一：**Docker 里跑** 或 **Windows 本机安装**）
- **Docker Desktop**（可选；若坚持用 Docker 跑 MySQL/MinIO，则 **必须**，且需先修好 **WSL2**，见 **§1.3**）

## 1. 启动基础设施

### 若本机已有 MySQL（可完全不用 Docker）

1. **确认 MySQL 服务已启动**，且能连上（Workbench / 命令行均可）。  
2. 后端默认连接 **`localhost:3306`**，库名 **`skillverify`**，用户/密码 **`skillverify` / `skillverify`**（见 `backend/src/main/resources/application-dev.yml`）。  
   - 若你的端口不是 **3306**，或要用 **root / 其它账号**，请直接改该文件里的 **`url` / `username` / `password`**（勿把真实密码提交到 Git；可自建 `application-local.yml` 并加入 `.gitignore` 覆盖配置）。  
3. 在 MySQL 里执行 **§1.2** 中的 SQL（若库和用户已存在且权限正确，可跳过建库建用户）。  
4. 直接进入 **§2 启动后端** 即可。

---

以下 **Docker** 为可选：仅在希望用容器跑 MySQL / MinIO 时使用。

先确保 **Docker Desktop 已安装并已启动**（系统托盘有鲸鱼图标，且为 *Running*）。若出现 `npipe:////./pipe/dockerDesktopLinuxEngine` 找不到，说明 **引擎未起来**：请打开 Docker Desktop 等待其完全就绪后重试。

**只启动 MySQL（推荐，避免拉取 MinIO 镜像）：**

```bash
docker compose up -d mysql
```

**需要 MinIO 时（对象存储联调）：**

```bash
docker compose --profile storage up -d
```

- MySQL：`localhost:3306`，库名 `skillverify`，用户/密码 `skillverify` / `skillverify`（与 `application-dev.yml` 一致）
- MinIO（可选）：API `localhost:9000`，控制台 `localhost:9001`，用户名/密码 `minio` / `minio_minio`

### 1.1 Docker 报错：`wsl.exe -l -v` / `CommandTimedOut`

说明 **WSL 未正常响应**，Docker 引擎起不来（与 VPN 无关）。

**若 `wsl -l -v` 提示「没有已安装的分发」**：需要先装一个 Linux 发行版（Docker Desktop WSL2 后端依赖）。用 **管理员 PowerShell** 执行：

```powershell
wsl --install
```

或指定 Ubuntu：

```powershell
wsl --install -d Ubuntu
```

按提示 **重启电脑**，首次进入 Ubuntu 时完成用户名密码初始化。再执行 `wsl -l -v`，应看到 **VERSION 为 2**。随后再启动 Docker Desktop。

查看可用发行版：`wsl.exe --list --online`。

**若已有分发但仍超时**，请用 **管理员 PowerShell** 依次尝试：

```powershell
wsl --shutdown
wsl --update
```

然后 **重启电脑**，再启动 Docker Desktop。若 **`wsl -l -v` 卡住或报错**，需检查：启用「虚拟机平台」「适用于 Linux 的 Windows 子系统」，BIOS 开启虚拟化，必要时重装 [WSL 内核更新包](https://aka.ms/wsl2kernel)。

仍不行可改用下文 **本机 MySQL**，无需 Docker；若**坚持 Docker**，请转 **§1.3** 按顺序排障。

### 1.3 坚持使用 Docker Desktop（在 Windows 上的现实条件）

在 Windows 上，**Docker Desktop 的 Linux 容器**依赖 **WSL2** 与 **至少一个已正常初始化的发行版**（如 Ubuntu）。`wsl -l` 无分发、或 `wsl.exe` 卡死/超时，Docker 引擎**无法稳定启动**。请按 **顺序** 做，不要跳过：

| 步骤 | 做什么 | 通过标准 |
|:----:|--------|----------|
| 1 | **BIOS/UEFI** 开启 CPU **虚拟化**；任务管理器 → 性能 → CPU →「虚拟化：已启用」 | 已启用 |
| 2 | **Windows 功能** 勾选 **虚拟机平台**、**适用于 Linux 的 Windows 子系统**，重启 | 已勾选并重启过 |
| 3 | 安装发行版：优先 **Microsoft Store → Ubuntu 22.04 LTS**；或管理员 PowerShell：`wsl --install -d Ubuntu`（慢可换热点 / 试 `wsl --install -d Ubuntu --web-download`） | 能打开 Ubuntu 并完成**首次**用户名、密码（不要长期黑屏，见 §1.1） |
| 4 | 验证：`wsl -l -v` 中 **有 Ubuntu**，**VERSION 为 2**；且命令 **10 秒内** 有输出（不卡死） | 满足 |
| 5 | 若 `wsl -l` **卡死**：`wsl --shutdown` → 服务里重启 **LxssManager**；**控制面板** 关闭 **快速启动** 后**冷启动**；仍不行再 `dism /online /cleanup-image /restorehealth` 与 `sfc /scannow` | 能稳定 `wsl -l -v` |
| 6 | 装**最新** **Docker Desktop**；**Settings → General** 勾选 **Use the WSL 2 based engine**；**Resources → WSL integration** 对 **Ubuntu** 打开 **Enable** | 托盘图标 **Running** |
| 7 | 项目根目录：`docker compose up -d mysql` | `docker ps` 可见 `mysql` 容器 |

**若 WSL 在本机始终无法稳定（第 4～5 步无法通过）** 而仍「坚持容器化」：只能换路线，例如 **Hyper-V / VMware 里装 Linux，在 Linux 里用 Docker Engine**（不用 Docker Desktop），或 **公司/云主机上的远程 Docker**；这已超出本仓库默认文档范围，需自行环境准备。

### 1.2 不用 Docker：Windows 本机安装 MySQL 8

1. 安装 MySQL 8（官方 Installer），端口 **3306**。  
2. 使用 root 登录 MySQL 客户端后执行（与 `application-dev.yml` 一致）：

```sql
CREATE DATABASE IF NOT EXISTS skillverify
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'skillverify'@'localhost' IDENTIFIED BY 'skillverify';
GRANT ALL PRIVILEGES ON skillverify.* TO 'skillverify'@'localhost';
FLUSH PRIVILEGES;
```

（若提示用户已存在，可先 `DROP USER 'skillverify'@'localhost';` 再执行 `CREATE USER`，或改用你自己的账号并修改 `application-dev.yml`。）

3. 直接执行「§2 启动后端」；Flyway 会在首次启动时建表。

## 2. 启动后端

```bash
cd backend
mvn spring-boot:run
```

健康检查：<http://localhost:8080/api/v1/health>

响应 `data` 中含 **`database`**：`status` 为 `UP` 时表示已通过 **MyBatis-Plus** 访问当前连接的 MySQL（并返回 `system_meta` 表行数）；启动前须保证 MySQL 已就绪，否则 Flyway 初始化失败将导致进程退出。

约定响应信封：`{ "code": 0, "message": "success", "data": { ... } }`（详见需求说明书第 13 章）。

## 3. 启动前端

```bash
cd frontend
npm install
npm run dev
```

生产构建与类型检查：

```bash
npm run typecheck
npm run build
```

（工程锁定 **Vite 5.4.x**，以降低部分 Windows 环境下 Vite 6 生产构建的兼容风险。）

若 `npm install` 出现 **`EBADSIZE`（stream size mismatch）**：多为 **缓存损坏** 或 **网络/代理/杀软** 截断下载。`frontend` 已含 **`.npmrc`**（默认 `registry.npmmirror.com`）。仍失败时请依次尝试：

```powershell
# 1）删掉 npm 本机缓存里的内容缓存（比 clean --force 更彻底）
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\npm-cache\_cacache" -ErrorAction SilentlyContinue

# 2）在项目内用「全新缓存目录」安装，避免读到旧块
cd frontend
npm install --cache .npm-cache --prefer-online
```

仍报错可暂时关闭 VPN/代理、换手机热点，或安装 **pnpm** 后：`corepack enable` → `pnpm install`。前端目录已保留 `.gitignore` 忽略 `.npm-cache/`（若需可自行添加）。

浏览器访问：<http://localhost:5173>  
开发环境下 `/api` 由 Vite 代理到 `http://localhost:8080`。

## 4. 测试

```bash
cd backend
mvn test
```

## 仓库结构（骨架）

```
├── backend/                 Spring Boot API
├── frontend/                Vue SPA
├── docker-compose.yml       MySQL + MinIO
├── 职业技能认定管理系统-详细需求规格说明书.md
└── 开发周历-每周进展.md
```

## 后续迭代（按周历）

- JWT、Spring Security、对象存储接入、业务模块与统一权限等见《开发周历-每周进展.md》。
