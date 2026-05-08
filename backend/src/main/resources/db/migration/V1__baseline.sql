-- Flyway baseline: schema versioning anchor (skill-verify)
CREATE TABLE IF NOT EXISTS system_meta (
    meta_key   VARCHAR(64)  NOT NULL PRIMARY KEY,
    meta_value VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
