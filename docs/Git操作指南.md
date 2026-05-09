# Git 日常操作指南（贴近真实开发）

> 适用于单人或小团队：日常更新、分支协作、提交推送、回滚纠错。  
> 示例默认远程名为 `origin`、主分支为 `main`；若使用 `master` 或 `develop`，替换分支名即可。

---

## 1. 日常循环（最常见）

### 开工前

避免在过时的代码上开发：

```bash
git checkout main
git pull origin main
```

### 改代码 → 阶段性保存

```bash
git status                    # 查看改了哪些文件
git diff                      # 查看具体改动（可选）
git add -p                    # 按块暂存，避免误提交（可选）
git add <文件或目录>
git commit -m "feat(scope): 简短说明"
```

### 推到远端（备份 + 协作）

```bash
git push origin main
```

**习惯：** 先 `pull` 再 `push`，减少冲突；小步提交，一条提交只做一件事，便于回滚与 Code Review。

---

## 2. 功能开发（推荐：分支）

真实项目里较少所有人长期在 `main` 上直接堆功能，常见流程：

```bash
git checkout main
git pull origin main
git checkout -b feature/xxx    # 或 fix/描述

# …开发与多次 commit…

git push -u origin feature/xxx   # 首次推送并建立上游跟踪
```

在 GitHub 上创建 **Pull Request (PR)**，Review 通过后合并进 `main`。

把远端 `main` 的最新改动并入你的功能分支：

```bash
git checkout feature/xxx
git fetch origin
git merge origin/main          # 或 git rebase origin/main（团队约定一种）
git push origin feature/xxx
```

**要点：** `main` 尽量保持可发布状态，功能在分支上隔离。

---

## 3. 「更新项目」常见场景

| 场景 | 命令 |
|------|------|
| 拉取远端最新 `main` 到本机 | `git checkout main` → `git pull origin main` |
| 仅同步远端引用，不合并 | `git fetch origin` |
| 查看远端比本地多哪些提交 | `git fetch origin` → `git log main..origin/main --oneline` |
| 他人已合并 PR，你继续开发 | 更新本地 `main`（`pull`），再在功能分支上 `merge`/`rebase` `origin/main` |

---

## 4. 回滚与纠错

### 4.1 尚未 commit（工作区 / 暂存区）

| 目的 | 命令 |
|------|------|
| 丢弃某文件未提交的修改 | `git restore <文件>` |
| 取消暂存，保留文件内容 | `git restore --staged <文件>` |
| 丢弃全部未提交改动（危险） | `git restore .` |

### 4.2 已 commit，尚未 push（仅影响本机）

| 目的 | 命令 |
|------|------|
| 修改最后一次提交说明或补文件 | `git commit --amend` |
| 撤销最近 1 次提交并丢弃其改动 | `git reset --hard HEAD~1` |
| 回到指定提交（慎用，会丢其后本地提交） | `git reset --hard <commit>` |

### 4.3 已经 push 到 GitHub（共享历史）

**不要**对多人使用的 `main` 随意 `reset` + `push --force`，除非团队明文允许。

推荐用 **revert**（新增一次提交抵消指定改动，历史不断裂）：

```bash
git revert <要撤销的提交的 SHA>
git push origin main
```

### 4.4 撤销某次合并（Merge）

可在 GitHub 上对 Merge PR 点 **Revert**，或本地对 merge commit：

```bash
git revert -m 1 <merge_commit_sha>
```

`-m 1` 表示保留合并的第一父提交那条线；合并提交场景需结合团队约定理解。

---

## 5. 临时打断：stash

写到一半需要切分支或拉代码：

```bash
git stash push -m "wip: 说明"
git checkout main && git pull
# …处理其他事…
git checkout feature/xxx
git stash pop              # 取出并删除该条 stash；若有冲突则当场解决
```

查看列表：`git stash list`；只查看不删除：`git stash apply`。

---

## 6. 冲突处理

当出现 `CONFLICT`：

1. 打开冲突文件，搜索 `<<<<<<<`。
2. 编辑为最终代码，删除冲突标记。
3. `git add` 已解决文件。
4. **Merge 尚未完成时：** `git commit`。  
   **Rebase 过程中：** `git rebase --continue`。

放弃本次合并或变基：`git merge --abort` / `git rebase --abort`（在结束前可用）。

---

## 7. 查看历史与版本标记

```bash
git log --oneline -20
git show <SHA>
git diff main origin/main    # 需先 git fetch
```

发布版本可打标签：

```bash
git tag -a v0.1.0 -m "说明"
git push origin v0.1.0
```

---

## 8. 真实团队中的习惯

1. **密钥不进仓库**：本地覆盖配置用 `application-local.yml` 等（本仓库 `.gitignore` 已忽略），或环境变量。
2. **提交信息**：常见 [Conventional Commits](https://www.conventionalcommits.org/)，如 `feat:`、`fix:`、`docs:`、`refactor:`。
3. **勿提交** `node_modules`、`target/`、`.env` 等；依赖 `.gitignore`。
4. **上线**：对部署对应的 commit 或 tag 有记录，出问题用 `revert` 或回滚到 tag。
5. **`git push --force`**：仅用于自己的功能分支且团队允许；**勿**在共享 `main` 上随意强推。

---

## 9. 与本项目配合的默认路径

| 情况 | 建议 |
|------|------|
| 小改动、单人 | 可在 `main` 上 `pull` → 修改 → `commit` → `push`。 |
| 功能较大或需要 PR | 使用 `feature/…` 分支，合并进 `main`。 |
| 已推送的错误提交 | 优先 **`git revert`**，避免 **`reset` + `--force`** 改写共享历史。 |

---

## 10. 速查表

| 我想… | 命令或思路 |
|------|------------|
| 同步远端 main | `git checkout main && git pull origin main` |
| 保存进度临时离开 | `git stash` |
| 撤销未保存的修改 | `git restore <文件>` |
| 撤销已提交但未推送 | `git reset --hard HEAD~1`（谨慎） |
| 撤销已推送的提交 | `git revert <SHA>` 再 `push` |
| 看远端是否有新提交 | `git fetch && git log HEAD..origin/main` |

---

*文档随项目演进可自行增补团队分支策略（例如是否必须使用 PR、是否 rebase）。*
