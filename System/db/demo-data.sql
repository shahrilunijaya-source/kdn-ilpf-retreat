-- iLPF demo data — realistic completed tapisan history for user 1 (Ridzuan)
-- Run once against u958029070_ilpf

USE u958029070_ilpf;

-- ─── ADDITIONAL FILMS (IDs 6–15) ─────────────────────────────────────────────

INSERT INTO ilpf_films
  (no_permohonan, film_ref, tajuk, pengedar, jenis, tujuan, durasi_minit, tarikh_hantar, kategori)
VALUES
  ('FBAM20260383001', 'FBAM20260383001',
   'Polis Evo 4',
   'Astro Shaw Sdn Bhd', 'Filem', 'Tayangan Pawagam', 118,
   '2026-01-08',
   '["Tayangan Pawagam","Cereka","Filem","1 jam 58 min","Tempatan"]'),

  ('FBAM20260383002', 'FBAM20260383002',
   'Upin & Ipin: Lagenda Pulau',
   'Les Copaque Production', 'Filem', 'Tayangan Pawagam', 95,
   '2026-01-15',
   '["Tayangan Pawagam","Animasi","Filem","1 jam 35 min","Tempatan"]'),

  ('FBAM20260383003', 'FBAM20260383003',
   'Damak',
   'KRU Studios', 'Filem', 'Tayangan Pawagam', 105,
   '2026-01-22',
   '["Tayangan Pawagam","Cereka","Filem","1 jam 45 min","Tempatan"]'),

  ('PCBM20260383004', 'PCBM20260383004',
   'Budak Kelantan: Reborn',
   'Primeworks Studios', 'Pita', 'Tayangan TV (Bukan VOD)', 94,
   '2026-02-03',
   '["Tayangan TV (Bukan VOD)","Cereka","Pita","1 jam 34 min","Tempatan"]'),

  ('FBAM20260383005', 'FBAM20260383005',
   'Ola Bola: Generasi Baru',
   'Choo Kok Keong Productions', 'Filem', 'Tayangan Pawagam', 108,
   '2026-02-10',
   '["Tayangan Pawagam","Cereka","Filem","1 jam 48 min","Tempatan"]'),

  ('FBAM20260383006', 'FBAM20260383006',
   'KL Gangster 3',
   'Skop Productions', 'Filem', 'Tayangan Pawagam', 120,
   '2026-02-18',
   '["Tayangan Pawagam","Cereka","Filem","2 jam","Tempatan"]'),

  ('PCBM20260383007', 'PCBM20260383007',
   'Seru 2',
   'Khabir Bhatia Productions', 'Pita', 'Tayangan TV (Bukan VOD)', 101,
   '2026-03-01',
   '["Tayangan TV (Bukan VOD)","Cereka","Pita","1 jam 41 min","Tempatan"]'),

  ('FBAM20260383008', 'FBAM20260383008',
   'Mat Som 2026',
   'Kewi Production', 'Filem', 'Tayangan Pawagam', 112,
   '2026-03-12',
   '["Tayangan Pawagam","Cereka","Filem","1 jam 52 min","Tempatan"]'),

  ('FBAM20260383009', 'FBAM20260383009',
   'Sheriff: Narko-Integriti 2',
   'Astro Shaw Sdn Bhd', 'Filem', 'Tayangan Pawagam', 115,
   '2026-03-20',
   '["Tayangan Pawagam","Cereka","Filem","1 jam 55 min","Tempatan"]'),

  ('PCBM20260383010', 'PCBM20260383010',
   'Ribut',
   'Filem Negara Malaysia', 'Pita', 'Tayangan Amal', 96,
   '2026-04-01',
   '["Tayangan Amal","Dokumentari","Pita","1 jam 36 min","Tempatan"]');

-- ─── SELESAI ASSIGNMENTS (user_id=1, films 6–15) ─────────────────────────────

INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status, updated_at) VALUES
  (6,  1, 'ketua', 'P1', '2026-01-22', 'selesai', '2026-01-20 10:30:00'),
  (7,  1, 'ahli',  'P2', '2026-01-28', 'selesai', '2026-01-27 14:15:00'),
  (8,  1, 'ketua', 'P1', '2026-02-05', 'selesai', '2026-02-04 09:45:00'),
  (9,  1, 'ahli',  'P3', '2026-02-20', 'selesai', '2026-02-18 11:00:00'),
  (10, 1, 'ketua', 'P1', '2026-02-25', 'selesai', '2026-02-24 15:30:00'),
  (11, 1, 'ahli',  'P2', '2026-03-07', 'selesai', '2026-03-06 10:00:00'),
  (12, 1, 'ketua', 'P1', '2026-03-18', 'selesai', '2026-03-17 16:20:00'),
  (13, 1, 'ahli',  'P2', '2026-03-26', 'selesai', '2026-03-25 13:45:00'),
  (14, 1, 'ketua', 'P1', '2026-04-08', 'selesai', '2026-04-07 09:10:00'),
  (15, 1, 'ahli',  'P3', '2026-04-15', 'selesai', '2026-04-14 14:30:00');

-- ─── DECISIONS FOR COMPLETED ASSIGNMENTS ─────────────────────────────────────
-- assignment IDs 6–15 correspond to the 10 new selesai rows above

INSERT INTO ilpf_decisions (assignment_id, keputusan, klasifikasi, status, created_by) VALUES
  (6,  'LDP', '13',   'disahkan', 1),
  (7,  'LBP', 'U',    'disahkan', 1),
  (8,  'LDP', '18',   'disahkan', 1),
  (9,  'LDP', '18',   'disahkan', 1),
  (10, 'LBP', 'U',    'disahkan', 1),
  (11, 'LDP', '13',   'disahkan', 1),
  (12, 'LDP', '18',   'disahkan', 1),
  (13, 'LDP', '13',   'disahkan', 1),
  (14, 'LDP', '13',   'disahkan', 1),
  (15, 'LBP', 'U',    'disahkan', 1);
