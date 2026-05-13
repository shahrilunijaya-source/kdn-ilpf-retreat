-- iLPF v2 — Beban (task load) seed for ALPF panel picker
-- Matches task counts from v3 _ahliNames[] array
-- Run AFTER seed.sql + seed-alpf-members.sql
-- Safe to re-run (INSERT IGNORE on films, subqueries for IDs)

USE u958029070_ilpf;

-- ─── DUMMY FILMS (for beban assignments) ────────────────────────────────────

INSERT IGNORE INTO ilpf_films (no_permohonan, film_ref, tajuk, pengedar, jenis, durasi_minit, tarikh_hantar)
VALUES
  ('BEBAN-DEMO-001','BEBAN-DEMO-001','[Demo] Filem Rujukan 01','Sistem Demo','Filem',90,'2026-01-01'),
  ('BEBAN-DEMO-002','BEBAN-DEMO-002','[Demo] Filem Rujukan 02','Sistem Demo','Filem',90,'2026-01-01'),
  ('BEBAN-DEMO-003','BEBAN-DEMO-003','[Demo] Filem Rujukan 03','Sistem Demo','Filem',90,'2026-01-01'),
  ('BEBAN-DEMO-004','BEBAN-DEMO-004','[Demo] Filem Rujukan 04','Sistem Demo','Filem',90,'2026-01-01'),
  ('BEBAN-DEMO-005','BEBAN-DEMO-005','[Demo] Filem Rujukan 05','Sistem Demo','Filem',90,'2026-01-01'),
  ('BEBAN-DEMO-006','BEBAN-DEMO-006','[Demo] Filem Rujukan 06','Sistem Demo','Filem',90,'2026-01-01'),
  ('BEBAN-DEMO-007','BEBAN-DEMO-007','[Demo] Filem Rujukan 07','Sistem Demo','Filem',90,'2026-01-01'),
  ('BEBAN-DEMO-008','BEBAN-DEMO-008','[Demo] Filem Rujukan 08','Sistem Demo','Filem',90,'2026-01-01'),
  ('BEBAN-DEMO-009','BEBAN-DEMO-009','[Demo] Filem Rujukan 09','Sistem Demo','Filem',90,'2026-01-01'),
  ('BEBAN-DEMO-010','BEBAN-DEMO-010','[Demo] Filem Rujukan 10','Sistem Demo','Filem',90,'2026-01-01'),
  ('BEBAN-DEMO-011','BEBAN-DEMO-011','[Demo] Filem Rujukan 11','Sistem Demo','Filem',90,'2026-01-01'),
  ('BEBAN-DEMO-012','BEBAN-DEMO-012','[Demo] Filem Rujukan 12','Sistem Demo','Filem',90,'2026-01-01'),
  ('BEBAN-DEMO-013','BEBAN-DEMO-013','[Demo] Filem Rujukan 13','Sistem Demo','Filem',90,'2026-01-01'),
  ('BEBAN-DEMO-014','BEBAN-DEMO-014','[Demo] Filem Rujukan 14','Sistem Demo','Filem',90,'2026-01-01'),
  ('BEBAN-DEMO-015','BEBAN-DEMO-015','[Demo] Filem Rujukan 15','Sistem Demo','Filem',90,'2026-01-01');

-- ─── ASSIGNMENTS (beban per member) ─────────────────────────────────────────
-- Each INSERT uses subqueries — safe regardless of auto-increment IDs

-- Abdul Hafeez bin Hamzah — 1 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00001'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan = 'BEBAN-DEMO-001';

-- Arjunaiti bin Abdullah — 1 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00002'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan = 'BEBAN-DEMO-001';

-- Azidi bin Abdul Khahar — 11 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00003'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN (
  'BEBAN-DEMO-001','BEBAN-DEMO-002','BEBAN-DEMO-003','BEBAN-DEMO-004','BEBAN-DEMO-005',
  'BEBAN-DEMO-006','BEBAN-DEMO-007','BEBAN-DEMO-008','BEBAN-DEMO-009','BEBAN-DEMO-010',
  'BEBAN-DEMO-011'
);

-- Azreena binti Ahmad — 5 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00004'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN (
  'BEBAN-DEMO-001','BEBAN-DEMO-002','BEBAN-DEMO-003','BEBAN-DEMO-004','BEBAN-DEMO-005'
);

-- Buvaneswary A/P Maniam @ Subramaniam — 2 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00005'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN ('BEBAN-DEMO-001','BEBAN-DEMO-002');

-- Dato Sobri bin Ahmad — 2 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00007'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN ('BEBAN-DEMO-001','BEBAN-DEMO-002');

-- Datuk Ooi Kee Heng — 2 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00008'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN ('BEBAN-DEMO-001','BEBAN-DEMO-002');

-- Evans Ong Yih Jie — 1 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00011'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan = 'BEBAN-DEMO-001';

-- Fahmi Khawarizmi bin Mahmud — 4 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00012'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN (
  'BEBAN-DEMO-001','BEBAN-DEMO-002','BEBAN-DEMO-003','BEBAN-DEMO-004'
);

-- Hairiah binti Abdul Ghani — 1 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00014'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan = 'BEBAN-DEMO-001';

-- Irdawani binti Mohamad Selamat — 5 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00016'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN (
  'BEBAN-DEMO-001','BEBAN-DEMO-002','BEBAN-DEMO-003','BEBAN-DEMO-004','BEBAN-DEMO-005'
);

-- Lee Hao Jie — 1 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00020'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan = 'BEBAN-DEMO-001';

-- Lee Kum Yip — 2 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00021'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN ('BEBAN-DEMO-001','BEBAN-DEMO-002');

-- Lt. Kdr (B) Md. Yusuf bin Hj. Ismail — 1 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00022'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan = 'BEBAN-DEMO-001';

-- Marsila binti Sulaiman — 2 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00023'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN ('BEBAN-DEMO-001','BEBAN-DEMO-002');

-- Masni binti Awang — 2 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00024'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN ('BEBAN-DEMO-001','BEBAN-DEMO-002');

-- Mimi Hanirul Sazni binti Mohd Sadali — 4 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00025'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN (
  'BEBAN-DEMO-001','BEBAN-DEMO-002','BEBAN-DEMO-003','BEBAN-DEMO-004'
);

-- Mohd Fazli bin Mohd Haron — 1 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00026'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan = 'BEBAN-DEMO-001';

-- Mustapa bin Mohammad Yasin — 2 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00028'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN ('BEBAN-DEMO-001','BEBAN-DEMO-002');

-- Muzamir bin Saboo — 1 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00029'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan = 'BEBAN-DEMO-001';

-- Noor Hafiza binti Hasan — 3 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00030'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN ('BEBAN-DEMO-001','BEBAN-DEMO-002','BEBAN-DEMO-003');

-- Nur Jannahkhairunnisa bt Md Said — 1 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00032'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan = 'BEBAN-DEMO-001';

-- Saiful Asidi bin Johari — 10 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00038'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN (
  'BEBAN-DEMO-001','BEBAN-DEMO-002','BEBAN-DEMO-003','BEBAN-DEMO-004','BEBAN-DEMO-005',
  'BEBAN-DEMO-006','BEBAN-DEMO-007','BEBAN-DEMO-008','BEBAN-DEMO-009','BEBAN-DEMO-010'
);

-- Sia Soh Guad — 2 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00040'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN ('BEBAN-DEMO-001','BEBAN-DEMO-002');

-- Sofia Lim binti Abdullah — 2 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00041'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN ('BEBAN-DEMO-001','BEBAN-DEMO-002');

-- Stella Stephen Chin — 2 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00042'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN ('BEBAN-DEMO-001','BEBAN-DEMO-002');

-- Tohit bin Hj. Sidek — 1 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00044'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan = 'BEBAN-DEMO-001';

-- YM. Engku Mohamed Khairy Azwi bin Rozalay — 4 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00047'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan IN (
  'BEBAN-DEMO-001','BEBAN-DEMO-002','BEBAN-DEMO-003','BEBAN-DEMO-004'
);

-- Zuraidi bin Mohd Johan — 1 tugasan
INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status)
SELECT id, (SELECT id FROM ilpf_users WHERE alpf_id = 'ALPF/2021/00048'), 'ahli', 'P1', '2026-06-30', 'menunggu'
FROM ilpf_films WHERE no_permohonan = 'BEBAN-DEMO-001';
