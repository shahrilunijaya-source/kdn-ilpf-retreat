-- iLPF v2 — Beban (task load) seed for ALPF panel picker
-- Matches task counts from v3 _ahliNames[] array
-- Run AFTER seed.sql + seed-alpf-members.sql
-- Safe to re-run (INSERT IGNORE on films, subqueries for IDs)

USE u958029070_ilpf;

-- ─── DUMMY FILMS (for beban assignments) ────────────────────────────────────

INSERT IGNORE INTO ilpf_films (no_permohonan, film_ref, tajuk, pengedar, jenis, durasi_minit, tarikh_hantar)
VALUES
  ('BEBAN-DEMO-001','BEBAN-DEMO-001','Abang Long Fadil 3',              'Astro Shaw Sdn Bhd',          'Filem',105,'2025-10-12'),
  ('BEBAN-DEMO-002','BEBAN-DEMO-002','Projek: Memikat Suami 3',         'Primeworks Studios',           'Pita', 94,'2025-10-20'),
  ('BEBAN-DEMO-003','BEBAN-DEMO-003','Sang Kancil: Lagenda Rimba',      'Les Copaque Production',       'Filem', 88,'2025-11-03'),
  ('BEBAN-DEMO-004','BEBAN-DEMO-004','Paskal 2: Misi Hitam',            'Skop Productions',             'Filem',118,'2025-11-15'),
  ('BEBAN-DEMO-005','BEBAN-DEMO-005','Interchange: Bayang Gelap',       'KRU Studios',                  'Filem',112,'2025-11-28'),
  ('BEBAN-DEMO-006','BEBAN-DEMO-006','Pulang: Kenangan Abadi',          'Astro Shaw Sdn Bhd',           'Filem', 96,'2025-12-05'),
  ('BEBAN-DEMO-007','BEBAN-DEMO-007','Munafik 3',                       'Khabir Bhatia Productions',    'Filem',103,'2025-12-14'),
  ('BEBAN-DEMO-008','BEBAN-DEMO-008','Ejen Ali: Misi Galaksi',          'Les Copaque Production',       'Filem', 92,'2025-12-22'),
  ('BEBAN-DEMO-009','BEBAN-DEMO-009','Dukun 2: Bayangan Malam',         'Tayangan Unggul Sdn Bhd',      'Filem', 99,'2026-01-08'),
  ('BEBAN-DEMO-010','BEBAN-DEMO-010','Mat Kilau: Semangat Pejuang',     'Primeworks Studios',           'Filem',125,'2026-01-16'),
  ('BEBAN-DEMO-011','BEBAN-DEMO-011','Kutukan Rimba Batu',              'Skop Productions',             'Filem', 97,'2026-01-24'),
  ('BEBAN-DEMO-012','BEBAN-DEMO-012','Polis Evo: Operasi Merah',        'Astro Shaw Sdn Bhd',           'Filem',110,'2026-02-06'),
  ('BEBAN-DEMO-013','BEBAN-DEMO-013','Lelaki Harapan Dunia 2',          'Kewi Production',              'Filem', 95,'2026-02-18'),
  ('BEBAN-DEMO-014','BEBAN-DEMO-014','KL Special Force 3',              'Tayangan Unggul Sdn Bhd',      'Filem',108,'2026-03-02'),
  ('BEBAN-DEMO-015','BEBAN-DEMO-015','Serigala Jahanam 2',              'Khabir Bhatia Productions',    'Filem',101,'2026-03-15');

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
