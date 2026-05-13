-- iLPF v2 — ALPF Workspace Database Schema
-- DB: u958029070_ilpf (Hostinger)

USE u958029070_ilpf;

-- ─── USERS ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ilpf_users (
  id                  INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  alpf_id             VARCHAR(30)      NOT NULL UNIQUE,
  name                VARCHAR(150)     NOT NULL,
  email               VARCHAR(150)     NOT NULL UNIQUE,
  password_hash       VARCHAR(255)     NOT NULL,
  role                ENUM('ahli','ketua','admin','penyelaras','pengerusi') NOT NULL DEFAULT 'ahli',
  initials            VARCHAR(5)       NULL,
  avatar_url          VARCHAR(255)     NULL,
  expertise           JSON             NULL,
  bahasa              VARCHAR(100)     NULL,
  no_kp               VARCHAR(20)      NULL,
  umur                TINYINT UNSIGNED NULL,
  jantina             ENUM('Lelaki','Perempuan') NULL,
  tarikh_lahir        DATE             NULL,
  tempat_lahir        VARCHAR(100)     NULL,
  bangsa              VARCHAR(50)      NULL,
  agama               VARCHAR(50)      NULL,
  warna_kp            VARCHAR(50)      NULL,
  alamat              TEXT             NULL,
  negeri              VARCHAR(50)      NULL,
  daerah              VARCHAR(50)      NULL,
  poskod              VARCHAR(10)      NULL,
  tel                 VARCHAR(20)      NULL,
  tel_bimbit          VARCHAR(20)      NULL,
  taraf_kahwin        VARCHAR(30)      NULL,
  pelantikan          DATE             NOT NULL,
  tamat               DATE             NOT NULL,
  penggal             VARCHAR(20)      NOT NULL DEFAULT 'Pertama',
  aku_janji_signed_at TIMESTAMP        NULL,
  aku_janji_version   VARCHAR(10)      NULL,
  created_at          TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ilpf_user_peranan (
  id       INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id  INT UNSIGNED NOT NULL,
  peranan  VARCHAR(150) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES ilpf_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ilpf_user_akademik (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id    INT UNSIGNED NOT NULL,
  tahap      VARCHAR(50)  NOT NULL,
  institusi  VARCHAR(150) NOT NULL,
  bidang     VARCHAR(150) NOT NULL,
  tahun      CHAR(4)      NOT NULL,
  sort_order TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES ilpf_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ilpf_user_pekerjaan (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id     INT UNSIGNED NOT NULL,
  jawatan     VARCHAR(150) NOT NULL,
  organisasi  VARCHAR(150) NOT NULL,
  sektor      VARCHAR(100) NULL,
  dari        CHAR(4)      NOT NULL,
  hingga      VARCHAR(20)  NOT NULL,
  description TEXT         NULL,
  sort_order  TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES ilpf_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ilpf_user_keluarga (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id      INT UNSIGNED NOT NULL,
  nama         VARCHAR(150) NOT NULL,
  hubungan     VARCHAR(50)  NOT NULL,
  no_kp        VARCHAR(20)  NULL,
  tarikh_lahir DATE         NULL,
  sort_order   TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES ilpf_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── SESSIONS ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ilpf_sessions (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id     INT UNSIGNED NOT NULL,
  token_hash  CHAR(64)     NOT NULL UNIQUE,
  device      VARCHAR(100) NOT NULL DEFAULT 'Browser',
  ip          VARCHAR(45)  NOT NULL,
  location    VARCHAR(100) NULL,
  last_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at  TIMESTAMP    NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES ilpf_users(id) ON DELETE CASCADE,
  INDEX idx_token (token_hash),
  INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── ANNOUNCEMENTS ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ilpf_announcements (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  from_label VARCHAR(50)  NOT NULL DEFAULT 'KETUA UNIT',
  title      VARCHAR(255) NOT NULL,
  body       TEXT         NULL,
  category   ENUM('umum','panggung','cuti','sistem') NOT NULL DEFAULT 'umum',
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── FILMS ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ilpf_films (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  no_permohonan  VARCHAR(30)  NOT NULL UNIQUE,
  film_ref       VARCHAR(30)  NOT NULL,
  tajuk          VARCHAR(255) NOT NULL,
  pengedar       VARCHAR(255) NOT NULL,
  jenis          ENUM('Filem','Pita','Publisiti','Iklan','TV') NOT NULL,
  tujuan         VARCHAR(100) NULL,
  durasi_minit   DECIMAL(8,1) NOT NULL DEFAULT 0,
  bahasa         VARCHAR(100) NULL,
  negara_asal    VARCHAR(100) NULL,
  video_path     VARCHAR(500) NULL,
  tarikh_hantar  DATE         NULL,
  kategori       JSON         NULL,
  ai_sinopsis    JSON         NULL,
  ai_dialog      JSON         NULL,
  ai_genre       JSON         NULL,
  ai_tema        JSON         NULL,
  ai_panel       JSON         NULL,
  ai_pengubahan  JSON         NULL,
  ai_keputusan   JSON         NULL,
  created_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_no_perm (no_permohonan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── ASSIGNMENTS ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ilpf_assignments (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  film_id      INT UNSIGNED NOT NULL,
  user_id      INT UNSIGNED NOT NULL,
  role         ENUM('ketua','ahli') NOT NULL DEFAULT 'ahli',
  panel_no     VARCHAR(10)  NOT NULL DEFAULT 'P1',
  tarikh_tamat DATE         NOT NULL,
  status       ENUM('menunggu','dalam_proses','selesai','lewat') NOT NULL DEFAULT 'menunggu',
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (film_id) REFERENCES ilpf_films(id),
  FOREIGN KEY (user_id) REFERENCES ilpf_users(id),
  INDEX idx_user_status (user_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ilpf_panels (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  assignment_id INT UNSIGNED NOT NULL,
  user_id       INT UNSIGNED NOT NULL,
  role          ENUM('ketua','ahli') NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_panel_member (assignment_id, user_id),
  FOREIGN KEY (assignment_id) REFERENCES ilpf_assignments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES ilpf_users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── EDITS (PENGUBAHAN) ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ilpf_edits (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  assignment_id INT UNSIGNED NOT NULL,
  bil           TINYINT UNSIGNED NOT NULL DEFAULT 1,
  source        ENUM('ai','manual') NOT NULL DEFAULT 'manual',
  ts_mula       VARCHAR(12)  NULL,
  ts_tamat      VARCHAR(12)  NULL,
  tindakan      ENUM('KABURKAN','POTONGKAN','SENYAPKAN','PSA OVERLAY','SEMAK MANUAL','GANTIKAN') NOT NULL,
  adegan        VARCHAR(100) NULL,
  description   TEXT         NULL,
  conf          TINYINT UNSIGNED NULL,
  status        ENUM('cadangan','diterima','ditolak') NOT NULL DEFAULT 'cadangan',
  created_by    INT UNSIGNED NOT NULL,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (assignment_id) REFERENCES ilpf_assignments(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES ilpf_users(id),
  INDEX idx_assignment (assignment_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── DECISIONS (KEPUTUSAN) ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ilpf_decisions (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  assignment_id INT UNSIGNED NOT NULL UNIQUE,
  keputusan     ENUM('LBP','LDP','TUT') NULL,
  klasifikasi   ENUM('U','P12','13','16','18','18PL','18SG','18PA') NULL,
  catatan       TEXT         NULL,
  pemberat      JSON         NULL,
  status        ENUM('draf','hantar','disahkan') NOT NULL DEFAULT 'draf',
  created_by    INT UNSIGNED NOT NULL,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (assignment_id) REFERENCES ilpf_assignments(id),
  FOREIGN KEY (created_by) REFERENCES ilpf_users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── REPORTS (BORANG LTF-A) ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ilpf_reports (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  assignment_id INT UNSIGNED NOT NULL UNIQUE,
  decision_id   INT UNSIGNED NOT NULL,
  no_rujukan    VARCHAR(50)  NULL,
  tarikh_laporan DATE        NULL,
  ulasan        TEXT         NULL,
  status        ENUM('draf','selesai','difail') NOT NULL DEFAULT 'draf',
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (assignment_id) REFERENCES ilpf_assignments(id),
  FOREIGN KEY (decision_id) REFERENCES ilpf_decisions(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── NOTES (REKOD TAPISAN) ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ilpf_notes (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  assignment_id INT UNSIGNED NOT NULL,
  user_id       INT UNSIGNED NOT NULL,
  ts_ref        VARCHAR(12)  NULL,
  content       TEXT         NOT NULL,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (assignment_id) REFERENCES ilpf_assignments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES ilpf_users(id),
  INDEX idx_assignment (assignment_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── LEAVE (CUTI) ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ilpf_leave (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id      INT UNSIGNED NOT NULL,
  jenis        ENUM('tahunan','sakit','khas','mesyuarat','latihan') NOT NULL DEFAULT 'tahunan',
  perihal      VARCHAR(255) NULL,
  tarikh_mula  DATE         NOT NULL,
  tarikh_tamat DATE         NOT NULL,
  status       ENUM('menunggu','lulus','tolak') NOT NULL DEFAULT 'menunggu',
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES ilpf_users(id),
  INDEX idx_user_dates (user_id, tarikh_mula, tarikh_tamat)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
