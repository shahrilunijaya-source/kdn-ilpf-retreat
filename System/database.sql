-- iLPF v2 — Database Schema
-- Run: mysql -u root -p < database.sql

CREATE DATABASE IF NOT EXISTS ilpf_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ilpf_system;

-- ─── ALPF Members ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS alpf (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    alpf_id         VARCHAR(30) NOT NULL UNIQUE,         -- e.g. ALPF/2024/00128
    name            VARCHAR(150) NOT NULL,
    initials        VARCHAR(5) NOT NULL,
    expertise       JSON NOT NULL,                        -- ["Penyiaran","Bahasa"]
    bahasa          VARCHAR(100) NULL,
    tarikh_lantikan DATE NOT NULL,
    tarikh_tamat    DATE NOT NULL,
    penggal         VARCHAR(20) NOT NULL DEFAULT 'Pertama',
    attend_pct      TINYINT UNSIGNED NOT NULL DEFAULT 100,
    beban           TINYINT UNSIGNED NOT NULL DEFAULT 0,  -- current open tasks
    sejak_tahun     YEAR NULL,
    is_active       TINYINT(1) NOT NULL DEFAULT 1,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_active (is_active)
) ENGINE=InnoDB;

-- ─── ALPF Profile: Peribadi ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS alpf_peribadi (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    alpf_id         INT UNSIGNED NOT NULL,
    no_kp           VARCHAR(20) NULL,
    umur            TINYINT UNSIGNED NULL,
    jantina         ENUM('Lelaki','Perempuan') NULL,
    tarikh_lahir    DATE NULL,
    tempat_lahir    VARCHAR(100) NULL,
    bangsa          VARCHAR(50) NULL,
    agama           VARCHAR(50) NULL,
    alamat          TEXT NULL,
    negeri          VARCHAR(50) NULL,
    daerah          VARCHAR(50) NULL,
    poskod          VARCHAR(10) NULL,
    tel             VARCHAR(20) NULL,
    tel_bimbit      VARCHAR(20) NULL,
    emel            VARCHAR(100) NULL,
    taraf_kahwin    VARCHAR(30) NULL,
    FOREIGN KEY (alpf_id) REFERENCES alpf(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ─── ALPF Profile: Peranan ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS alpf_peranan (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    alpf_id         INT UNSIGNED NOT NULL,
    peranan         VARCHAR(100) NOT NULL,
    FOREIGN KEY (alpf_id) REFERENCES alpf(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ─── ALPF Profile: Akademik ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS alpf_akademik (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    alpf_id         INT UNSIGNED NOT NULL,
    tahap           VARCHAR(50) NOT NULL,
    institusi       VARCHAR(150) NOT NULL,
    bidang          VARCHAR(150) NOT NULL,
    tahun           YEAR NOT NULL,
    FOREIGN KEY (alpf_id) REFERENCES alpf(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ─── ALPF Profile: Pekerjaan ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS alpf_pekerjaan (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    alpf_id         INT UNSIGNED NOT NULL,
    jawatan         VARCHAR(100) NOT NULL,
    organisasi      VARCHAR(150) NOT NULL,
    sektor          VARCHAR(100) NULL,
    dari_tahun      YEAR NOT NULL,
    hingga_tahun    YEAR NULL,                           -- NULL = sekarang
    penerangan      TEXT NULL,
    FOREIGN KEY (alpf_id) REFERENCES alpf(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ─── ALPF Profile: Keluarga ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS alpf_keluarga (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    alpf_id         INT UNSIGNED NOT NULL,
    nama            VARCHAR(150) NOT NULL,
    hubungan        VARCHAR(50) NOT NULL,
    no_kp           VARCHAR(20) NULL,
    tarikh_lahir    DATE NULL,
    FOREIGN KEY (alpf_id) REFERENCES alpf(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ─── Login Sessions ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sesi_login (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    alpf_id         INT UNSIGNED NOT NULL,
    session_token   VARCHAR(64) NOT NULL UNIQUE,
    device          VARCHAR(150) NULL,
    ip_address      VARCHAR(45) NULL,
    location        VARCHAR(100) NULL,
    last_active     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_current      TINYINT(1) NOT NULL DEFAULT 0,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (alpf_id) REFERENCES alpf(id) ON DELETE CASCADE,
    INDEX idx_alpf (alpf_id),
    INDEX idx_token (session_token)
) ENGINE=InnoDB;

-- ─── Pengumuman ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pengumuman (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    from_unit       VARCHAR(100) NOT NULL,
    title           VARCHAR(300) NOT NULL,
    body            TEXT NOT NULL,
    is_active       TINYINT(1) NOT NULL DEFAULT 1,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_active (is_active)
) ENGINE=InnoDB;

-- ─── Permohonan (Applications) ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS permohonan (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    no_permohonan   VARCHAR(30) NOT NULL UNIQUE,         -- e.g. PCBM20260396966
    film_id         VARCHAR(30) NOT NULL,
    title           VARCHAR(300) NOT NULL,
    jenis           ENUM('Filem','Pita','Publisiti','Iklan','TV') NOT NULL,
    pengedar        VARCHAR(150) NOT NULL,
    reg_no          VARCHAR(20) NULL,
    tujuan          VARCHAR(150) NULL,                   -- e.g. Tayangan Pawagam
    tarikh_hantar   DATE NULL,
    status_proses   TINYINT UNSIGNED NOT NULL DEFAULT 1, -- aliran step 1–11
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_jenis (jenis),
    INDEX idx_status (status_proses)
) ENGINE=InnoDB;

-- ─── Tugasan (Assignments) ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tugasan (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    permohonan_id   INT UNSIGNED NOT NULL,
    alpf_id         INT UNSIGNED NOT NULL,
    panel           VARCHAR(5) NOT NULL,                 -- P1, P2, P3...
    role            ENUM('ketua','ahli') NOT NULL DEFAULT 'ahli',
    status          ENUM('lewat','hari-ini','minggu-ini','akan-datang','selesai') NOT NULL DEFAULT 'akan-datang',
    due_date        DATE NULL,
    assigned_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    selesai_at      TIMESTAMP NULL,
    FOREIGN KEY (permohonan_id) REFERENCES permohonan(id) ON DELETE CASCADE,
    FOREIGN KEY (alpf_id) REFERENCES alpf(id) ON DELETE CASCADE,
    INDEX idx_alpf (alpf_id),
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- ─── Tapisan (Screening Records) ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tapisan (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tugasan_id      INT UNSIGNED NOT NULL UNIQUE,
    klasifikasi     VARCHAR(5) NULL,                     -- U, P13, 18, etc.
    keputusan       ENUM('LBP','LDP','TUT','TOLAK') NULL, -- LBP=lulus bersih, LDP=lulus dgn pengubahan
    sinopsis        TEXT NULL,
    sinopsis_conf   TINYINT UNSIGNED NULL,
    genre           JSON NULL,                           -- ["Drama","Seram"]
    tema            JSON NULL,
    pemberat        JSON NULL,                           -- {ganas:3, seram:2, ...}
    catatan         TEXT NULL,
    selesai_at      TIMESTAMP NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tugasan_id) REFERENCES tugasan(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ─── Tapisan: AI Pengubahan (Modification Suggestions) ──────────────────────
CREATE TABLE IF NOT EXISTS tapisan_pengubahan (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tapisan_id      INT UNSIGNED NOT NULL,
    bil             TINYINT UNSIGNED NOT NULL,
    masa_dari       VARCHAR(12) NOT NULL,                -- 00:01:30
    masa_hingga     VARCHAR(12) NOT NULL,
    tindakan        ENUM('KABURKAN','POTONGKAN','SENYAPKAN','PSA OVERLAY','SEMAK MANUAL') NOT NULL,
    adegan          VARCHAR(50) NOT NULL,                -- KEBOGELAN, SEKSUAL, etc.
    penerangan      VARCHAR(300) NULL,
    ai_conf         TINYINT UNSIGNED NOT NULL DEFAULT 0,
    diterima        TINYINT(1) NULL,                     -- NULL=pending, 1=yes, 0=no
    FOREIGN KEY (tapisan_id) REFERENCES tapisan(id) ON DELETE CASCADE,
    INDEX idx_tapisan (tapisan_id)
) ENGINE=InnoDB;

-- ─── Cuti (Leave Records) ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cuti (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    alpf_id         INT UNSIGNED NOT NULL,
    jenis           ENUM('cuti_rehat','cuti_sakit','mesyuarat','latihan','lain') NOT NULL,
    label           VARCHAR(150) NULL,                   -- display label
    dari            DATE NOT NULL,
    hingga          DATE NOT NULL,
    status          ENUM('menunggu','lulus','tolak') NOT NULL DEFAULT 'menunggu',
    catatan         TEXT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (alpf_id) REFERENCES alpf(id) ON DELETE CASCADE,
    INDEX idx_alpf (alpf_id),
    INDEX idx_dari (dari)
) ENGINE=InnoDB;

-- ─── Sejarah iLPF ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sejarah_ilpf (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    ref_id          VARCHAR(20) NOT NULL UNIQUE,         -- ilpf-2025-0844
    title           VARCHAR(300) NOT NULL,
    year            YEAR NOT NULL,
    tarikh          DATE NOT NULL,
    klasifikasi     VARCHAR(5) NULL,
    keputusan       ENUM('LBP','LDP','TUT','TOLAK') NULL,
    ketua_alpf_id   INT UNSIGNED NULL,
    pengubahan_count TINYINT UNSIGNED NOT NULL DEFAULT 0,
    pemberat_summary VARCHAR(200) NULL,
    catatan         TEXT NULL,
    similarity_score TINYINT UNSIGNED NULL,
    FOREIGN KEY (ketua_alpf_id) REFERENCES alpf(id) ON DELETE SET NULL,
    INDEX idx_year (year)
) ENGINE=InnoDB;

-- ─── Sejarah eFilem ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sejarah_efilem (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    ref_id          VARCHAR(20) NOT NULL UNIQUE,         -- ef-1184392
    title           VARCHAR(300) NOT NULL,
    year            YEAR NOT NULL,
    origin          VARCHAR(150) NULL,
    genre           VARCHAR(150) NULL,
    rating          VARCHAR(50) NULL,
    runtime         VARCHAR(30) NULL,
    bo              VARCHAR(50) NULL,
    kdn_identified  TINYINT(1) NOT NULL DEFAULT 0,
    similarity_score TINYINT UNSIGNED NULL,
    catatan         TEXT NULL,
    INDEX idx_year (year)
) ENGINE=InnoDB;

-- ─── Seed: Pengumuman ───────────────────────────────────────────────────────
INSERT INTO pengumuman (from_unit, title, body) VALUES
('KETUA UNIT', 'Mesyuarat panel khas — 16 Mei 2026, 10.00 pagi.', 'Semua ALPF Pita dijemput hadir. Agenda: pindaan Garis Panduan Penapisan 2026 Bab 4. Lokasi: Bilik Mesyuarat Utama, Aras 4.'),
('PENGERUSI', 'Cuti pertengahan tahun ALPF — kemaskini sebelum 30 Mei.', 'Sila kemaskini permohonan cuti pertengahan tahun anda menerusi modul Cuti. Lewat hantar dianggap tiada permohonan.');

-- ─── Seed: ALPF Members ─────────────────────────────────────────────────────
INSERT INTO alpf (alpf_id, name, initials, expertise, bahasa, tarikh_lantikan, tarikh_tamat, penggal, attend_pct, beban, sejak_tahun) VALUES
('ALPF/2024/00128', 'Encik Ridzuan bin Mohd Salleh', 'RM', '["Penyiaran","Bahasa"]', 'BM · BI · Tamil', '2024-07-05', '2026-07-05', 'Pertama', 97, 5, 2024),
('ALPF/2023/00045', 'Datin Yamunarani A/P R. Muthuthamby Pillay', 'YR', '["Bahasa","Tamil"]', NULL, '2023-01-01', '2025-12-31', 'Pertama', 99, 0, 2023),
('ALPF/2022/00031', 'Dato Dr Nik Azmi Bin Nik Omar', 'NA', '["Keagamaan","Pengajian Islam"]', NULL, '2022-01-01', '2024-12-31', 'Pertama', 97, 1, 2022),
('ALPF/2024/00201', 'Encik Hairul Aizam bin Mohd Shariff', 'HA', '["Penguatkuasaan","Undang-undang"]', NULL, '2024-01-01', '2026-12-31', 'Pertama', 94, 2, 2024),
('ALPF/2023/00112', 'Puan Aishah binti Mahmud', 'AM', '["Pendidikan","Psikologi"]', NULL, '2023-01-01', '2025-12-31', 'Pertama', 96, 1, 2023),
('ALPF/2022/00089', 'Dr Lim Wei Sheng', 'LW', '["Perfileman","Penyiaran"]', NULL, '2022-01-01', '2024-12-31', 'Pertama', 92, 3, 2022),
('ALPF/2025/00008', 'Encik Mohd Faizal bin Abdullah', 'MF', '["Keagamaan","Bahasa"]', NULL, '2025-01-01', '2027-12-31', 'Pertama', 98, 1, 2025),
('ALPF/2024/00167', 'Puan Sarah Anak Kelvin', 'SK', '["Pendidikan","Antropologi"]', NULL, '2024-01-01', '2026-12-31', 'Pertama', 95, 2, 2024),
('ALPF/2023/00078', 'Encik Tan Boon Hock', 'TB', '["Penyiaran","Cina (Mandarin)"]', NULL, '2023-01-01', '2025-12-31', 'Pertama', 93, 1, 2023),
('ALPF/2022/00055', 'Dato\' Profesor Dr Marina binti Yusoff', 'MY', '["Akademik","Pengajian Media"]', NULL, '2022-01-01', '2024-12-31', 'Pertama', 91, 2, 2022),
('ALPF/2024/00188', 'Tuan Ramachandran A/L Kalimuthu', 'RK', '["Tamil","Komuniti India"]', NULL, '2024-01-01', '2026-12-31', 'Pertama', 96, 0, 2024);
