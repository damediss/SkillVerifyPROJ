-- 骨架阶段：便于启动后立刻验证 MyBatis-Plus ↔ MySQL 读写链路（重复执行迁移时忽略冲突）
INSERT IGNORE INTO system_meta (meta_key, meta_value) VALUES ('boot_marker', 'skill-verify');
