CREATE DATABASE IF NOT EXISTS video_moderation CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE video_moderation;

CREATE TABLE IF NOT EXISTS moderation_jobs (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  job_uuid      CHAR(36) NOT NULL UNIQUE,
  source_type   ENUM('url','upload') NOT NULL,
  source_ref    VARCHAR(1024) NOT NULL,
  mode          ENUM('sync','async') NOT NULL,
  models        VARCHAR(512) NOT NULL,
  sightengine_media_id VARCHAR(128) NULL,
  status        ENUM('pending','processing','completed','failed') NOT NULL DEFAULT 'pending',
  verdict       ENUM('clean','flagged','review','unknown') NOT NULL DEFAULT 'unknown',
  max_scores    JSON NULL,
  raw_response  JSON NULL,
  error_message TEXT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_verdict (verdict),
  INDEX idx_media_id (sightengine_media_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS moderation_frames (
  id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  job_id       BIGINT UNSIGNED NOT NULL,
  frame_pos    DECIMAL(10,3) NOT NULL,
  scores       JSON NOT NULL,
  flagged      TINYINT(1) NOT NULL DEFAULT 0,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES moderation_jobs(id) ON DELETE CASCADE,
  INDEX idx_job (job_id),
  INDEX idx_flagged (flagged)
) ENGINE=InnoDB;
