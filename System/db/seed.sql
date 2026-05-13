-- iLPF v2 — Seed Data (demo user + sample data)
-- Password for all demo users: ilpf2026

USE u958029070_ilpf;

-- ─── DEMO USER ───────────────────────────────────────────────────────────────
-- password: ilpf2026

INSERT INTO ilpf_users
  (alpf_id, name, email, password_hash, role, initials,
   expertise, bahasa, no_kp, umur, jantina, tarikh_lahir, tempat_lahir,
   bangsa, agama, warna_kp, alamat, negeri, daerah, poskod,
   tel, tel_bimbit, taraf_kahwin, pelantikan, tamat, penggal)
VALUES
  ('ALPF/2024/00128', 'Encik Ridzuan bin Mohd Salleh',
   'ridzuan.salleh@kdn.gov.my',
   '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW',
   'ketua', 'RM',
   '["Penyiaran","Bahasa"]', 'BM · BI · Tamil',
   '780514-08-5423', 47, 'Lelaki', '1978-05-14', 'Taiping, Perak',
   'Melayu', 'Islam', 'Biru (Warganegara)',
   'No. 18, Jalan Damai 4/3, Taman Sri Damai, 47100 Puchong, Selangor',
   'Selangor', 'Petaling', '47100',
   '03-8076 4532', '+60 16-221 7576', 'Berkahwin',
   '2024-07-05', '2026-07-05', 'Pertama'),

  ('ALPF/2022/00045', 'Datin Yamunarani A/P R. Muthuthamby Pillay',
   'yamunarani@kdn.gov.my',
   '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW',
   'ahli', 'YR',
   '["Bahasa","Tamil"]', 'BM · Tamil · BI',
   NULL, NULL, 'Perempuan', NULL, NULL,
   NULL, NULL, NULL, NULL,
   NULL, NULL, NULL, NULL, NULL, NULL,
   '2022-03-01', '2027-03-01', 'Ketiga'),

  ('ALPF/2022/00031', 'Dato Dr Nik Azmi Bin Nik Omar',
   'nikazmi@kdn.gov.my',
   '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW',
   'pengerusi', 'NA',
   '["Keagamaan","Pengajian Islam"]', 'BM · Arab · BI',
   NULL, NULL, 'Lelaki', NULL, NULL,
   NULL, NULL, NULL, NULL,
   NULL, NULL, NULL, NULL, NULL, NULL,
   '2022-01-15', '2027-01-15', 'Ketiga');

-- ─── PERANAN ─────────────────────────────────────────────────────────────────

INSERT INTO ilpf_user_peranan (user_id, peranan) VALUES
  (1, 'LPF'),
  (1, 'LPF Stesen TV Pratonton'),
  (1, 'LPF Stesen TV RTM'),
  (1, 'Pegawai LPF Awesome'),
  (1, 'Pegawai LPF Sarawak'),
  (1, 'Pegawai LPF Suke'),
  (1, 'Pegawai LPF ENJOY TV');

-- ─── AKADEMIK ────────────────────────────────────────────────────────────────

INSERT INTO ilpf_user_akademik (user_id, tahap, institusi, bidang, tahun, sort_order) VALUES
  (1, 'Sarjana', 'Universiti Malaya', 'Pengajian Media & Komunikasi', '2008', 0),
  (1, 'Ijazah', 'Universiti Sains Malaysia', 'Komunikasi (Penyiaran)', '2002', 1),
  (1, 'Diploma', 'Politeknik Ungku Omar', 'Teknologi Penyiaran', '1998', 2);

-- ─── PEKERJAAN ───────────────────────────────────────────────────────────────

INSERT INTO ilpf_user_pekerjaan (user_id, jawatan, organisasi, sektor, dari, hingga, description, sort_order) VALUES
  (1, 'Pegawai Penyiaran Kanan', 'RTM (Radio Televisyen Malaysia)', 'Penyiaran Awam', '2014', 'Sekarang',
   'Mengetuai unit pengawalan kandungan dan penjadualan tayangan TV1 & TV2.', 0),
  (1, 'Penerbit Eksekutif', 'Astro Media', 'Penyiaran Berbayar', '2008', '2014',
   'Penerbit drama bersiri untuk Astro Ria; bertanggungjawab ke atas pematuhan kandungan.', 1),
  (1, 'Eksekutif Penyiaran', 'Media Prima Berhad', 'Penyiaran Awam', '2003', '2008',
   'Pengurusan trafik dan inventori iklan untuk TV3.', 2);

-- ─── KELUARGA ────────────────────────────────────────────────────────────────

INSERT INTO ilpf_user_keluarga (user_id, nama, hubungan, no_kp, tarikh_lahir, sort_order) VALUES
  (1, 'Puan Nurul Aisyah binti Hamid', 'Isteri', '820318-10-5288', '1982-03-18', 0),
  (1, 'Ahmad Hakim bin Ridzuan', 'Anak (Lelaki)', '100212-10-0123', '2010-02-12', 1),
  (1, 'Aisya Damia binti Ridzuan', 'Anak (Perempuan)', '130509-10-0987', '2013-05-09', 2);

-- ─── ANNOUNCEMENTS ───────────────────────────────────────────────────────────

INSERT INTO ilpf_announcements (from_label, title, body, category) VALUES
  ('KETUA UNIT',
   'Mesyuarat panel khas — 16 Mei 2026, 10.00 pagi.',
   'Semua ALPF Pita dijemput hadir. Agenda: pindaan Garis Panduan Penapisan 2026 Bab 4. Lokasi: Bilik Mesyuarat Utama, Aras 4.',
   'panggung'),
  ('PENGERUSI',
   'Cuti pertengahan tahun ALPF — kemaskini sebelum 30 Mei.',
   'Sila kemaskini permohonan cuti pertengahan tahun anda menerusi modul Cuti. Lewat hantar dianggap tiada permohonan.',
   'cuti');

-- ─── FILMS ───────────────────────────────────────────────────────────────────

INSERT INTO ilpf_films
  (no_permohonan, film_ref, tajuk, pengedar, jenis, tujuan, durasi_minit,
   tarikh_hantar, kategori, ai_sinopsis, ai_dialog, ai_genre, ai_tema, ai_panel, ai_pengubahan, ai_keputusan)
VALUES
  ('PCBM20260396966', 'PCBM20260396966',
   'Dummy Pita 10032026 Ckeditor 002',
   'Network Twenty One Sdn Bhd',
   'Pita', 'Tayangan TV (Bukan VOD)', 176,
   '2026-03-10',
   '["Tayangan TV (Bukan VOD)","Cereka","Pita","2 jam 56 min","Tempatan","DVD · MP4"]',
   '{"text":"Murugan, seorang petani tua di selatan India, bergelut menghidupkan anak lelakinya Karthik yang malas. Selepas tragedi keluarga, Karthik menyusuri jejak ayahnya dan menemui rahsia gelap kampung yang berkait dengan dendam lama generasi terdahulu.","conf":89,"meta":"BM · 412 patah"}',
   '{"text":"Komposisi bahasa: BM 78% · BI 18% · Tamil 4%. Sarikata: TIADA. 5 profaniti dikesan. Cadangan: senyapkan 5 sebutan; jana sarikata BM auto dari ASR; selaras GPPF KDN 2024.","conf":82,"meta":"ASR + OCR"}',
   '{"text":"Berasaskan adegan, audio, dan dialog: Drama, Seram, Misteri. Aksi 42%, Thriller 38%.","conf":91,"top3":["Drama","Seram","Misteri"],"lower":[{"name":"Aksi","pct":42},{"name":"Thriller","pct":38}]}',
   '{"text":"Motif dikesan dari sinopsis + dialog: kekeluargaan dan dendam.","conf":84,"top3":["Kekeluargaan","Dendam","Pengorbanan"],"lower":[{"name":"Cinta","pct":31},{"name":"Persahabatan","pct":27}]}',
   '{"text":"Cadangan berdasarkan kepakaran selari dengan kandungan filem.","conf":87,"members":[{"name":"Datin Yamunarani A/P R. Muthuthamby Pillay","expertise":"Bahasa","attend":99},{"name":"Dato Dr Nik Azmi Bin Nik Omar","expertise":"Keagamaan","attend":97}]}',
   '[{"bil":"01","dan":"00:01:30","hingga":"00:01:58","tindakan":"KABURKAN","adegan":"KEBOGELAN","desc":"Pendedahan bahagian atas badan","conf":92},{"bil":"02","dan":"00:03:20","hingga":"00:03:49","tindakan":"POTONGKAN","adegan":"SEKSUAL","desc":"Adegan intim eksplisit + 2 profaniti","conf":88},{"bil":"03","dan":"00:05:14","hingga":"00:05:42","tindakan":"SENYAPKAN","adegan":"SERAM","desc":"Audio jolt +9 LU; kurangkan peak -6 dB","conf":91},{"bil":"04","dan":"00:07:08","hingga":"00:07:31","tindakan":"SENYAPKAN","adegan":"BAHASA","desc":"3 sebutan profaniti; sarikata diganti \'[…]\'","conf":86},{"bil":"05","dan":"00:09:42","hingga":"00:10:13","tindakan":"POTONGKAN","adegan":"GANAS","desc":"Klimaks pukulan + darah; potong 11s","conf":94},{"bil":"06","dan":"00:12:18","hingga":"00:12:36","tindakan":"PSA OVERLAY","adegan":"ROKOK","desc":"Pesanan kesihatan overlay 3s; tiada potongan","conf":79},{"bil":"07","dan":"00:14:30","hingga":"00:14:58","tindakan":"SEMAK MANUAL","adegan":"AGAMA","desc":"Simbol agama dalam konteks sensitif","conf":68},{"bil":"08","dan":"00:16:22","hingga":"00:16:58","tindakan":"KABURKAN","adegan":"JENAMA","desc":"2 jenama komersial dikesan tanpa pengisytiharan","conf":81}]',
   '{"text":"Berasaskan 5 pengubahan diterima + adegan seram berkadar tinggi (4x) + profaniti sederhana (2x): Lulus Dengan Pengubahan, P13. Pemberat tertinggi: Ganas Sederhana, Seram Sederhana, Bahasa Sederhana.","conf":88,"keputusan":"LDP","klasifikasi":"13","pemberat":{"ganas":3,"seram":3,"ngeri":1,"seksual":2,"kebogelan":1,"dadah":0,"rokok":1,"arak":0,"bahasa":3,"lain":0}}'),

  ('FBEN20260396995', 'FBEN20260396995',
   'Dummy Film 21042026 Rayuan — 003',
   'Astro Shaw Sdn Bhd',
   'Filem', 'Tayangan Pawagam', 118,
   '2026-04-10',
   '["Tayangan Pawagam","Cereka","Filem","1 jam 58 min","Luar Negara"]',
   NULL, NULL, NULL, NULL, NULL, NULL, NULL),

  ('FBAF20260397009', 'FBAF20260397009',
   'Data Refresher Course',
   'Filem Negara Malaysia',
   'Filem', 'Tayangan Amal', 85,
   '2026-04-10',
   '["Tayangan Amal","Dokumentari","Filem","1 jam 25 min","Tempatan"]',
   NULL, NULL, NULL, NULL, NULL, NULL, NULL),

  ('BP2026000412', 'BP2026000412',
   'Sheriff: Narko-Integriti 2 — Trailer',
   'Astro Shaw Sdn Bhd',
   'Publisiti', 'Bahan Publisiti', 3,
   '2026-05-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),

  ('PCBM20260397042', 'PCBM20260397042',
   'Inside Out 3 — Versi Dubbing BM',
   'Walt Disney Malaysia',
   'Filem', 'Tayangan Pawagam', 102,
   '2026-04-20', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ─── ASSIGNMENTS ─────────────────────────────────────────────────────────────

INSERT INTO ilpf_assignments (film_id, user_id, role, panel_no, tarikh_tamat, status) VALUES
  (2, 1, 'ketua', 'P1', '2026-04-22', 'lewat'),
  (3, 1, 'ketua', 'P1', '2026-04-22', 'lewat'),
  (1, 1, 'ketua', 'P1', '2026-05-15', 'dalam_proses'),
  (4, 1, 'ahli',  'P2', '2026-05-15', 'menunggu'),
  (5, 1, 'ahli',  'P3', '2026-05-18', 'menunggu');

-- ─── PANEL MEMBERS ───────────────────────────────────────────────────────────
-- (none pre-seeded — user picks during tapisan workflow)

-- ─── AI EDITS (pre-seeded from film.ai_pengubahan for assignment 3) ──────────

INSERT INTO ilpf_edits
  (assignment_id, bil, source, ts_mula, ts_tamat, tindakan, adegan, description, conf, status, created_by)
VALUES
  (3, 1, 'ai', '00:01:30', '00:01:58', 'KABURKAN', 'KEBOGELAN', 'Pendedahan bahagian atas badan', 92, 'cadangan', 1),
  (3, 2, 'ai', '00:03:20', '00:03:49', 'POTONGKAN', 'SEKSUAL', 'Adegan intim eksplisit + 2 profaniti', 88, 'cadangan', 1),
  (3, 3, 'ai', '00:05:14', '00:05:42', 'SENYAPKAN', 'SERAM', 'Audio jolt +9 LU; kurangkan peak -6 dB', 91, 'cadangan', 1),
  (3, 4, 'ai', '00:07:08', '00:07:31', 'SENYAPKAN', 'BAHASA', '3 sebutan profaniti; sarikata diganti [...]', 86, 'cadangan', 1),
  (3, 5, 'ai', '00:09:42', '00:10:13', 'POTONGKAN', 'GANAS', 'Klimaks pukulan + darah; potong 11s', 94, 'cadangan', 1),
  (3, 6, 'ai', '00:12:18', '00:12:36', 'PSA OVERLAY', 'ROKOK', 'Pesanan kesihatan overlay 3s; tiada potongan', 79, 'cadangan', 1),
  (3, 7, 'ai', '00:14:30', '00:14:58', 'SEMAK MANUAL', 'AGAMA', 'Simbol agama dalam konteks sensitif', 68, 'cadangan', 1),
  (3, 8, 'ai', '00:16:22', '00:16:58', 'KABURKAN', 'JENAMA', '2 jenama komersial dikesan tanpa pengisytiharan', 81, 'cadangan', 1);

-- ─── LEAVE ───────────────────────────────────────────────────────────────────

INSERT INTO ilpf_leave (user_id, jenis, perihal, tarikh_mula, tarikh_tamat, status) VALUES
  (2, 'mesyuarat', 'KURSUS INDUKSI ALPF', '2026-05-16', '2026-05-16', 'lulus'),
  (1, 'sakit', 'temujanji hospital', '2026-05-21', '2026-05-21', 'lulus'),
  (3, 'tahunan', 'cuti tahunan', '2026-05-23', '2026-05-25', 'lulus');
