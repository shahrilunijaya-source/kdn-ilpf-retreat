-- iLPF — Patch: Demo-Ready Data for May 16–17 Presentation
-- Safe to re-run (idempotent UPDATEs + DELETE by condition)
-- Run against: u958029070_ilpf

USE u958029070_ilpf;

-- ─── 1. Fix dummy film titles ─────────────────────────────────────────────────

UPDATE ilpf_films SET tajuk = 'Murugan: Dendam Tanah'
WHERE no_permohonan = 'PCBM20260396966';

UPDATE ilpf_films SET tajuk = 'Venom: The Last Dance (Versi BM)'
WHERE no_permohonan = 'FBEN20260396995';

UPDATE ilpf_films SET tajuk = 'Jalur Gemilang: Wira Bangsa'
WHERE no_permohonan = 'FBAF20260397009';

-- ─── 2. Fix beban film titles ─────────────────────────────────────────────────

UPDATE ilpf_films SET tajuk = 'Abang Long Fadil 3',           pengedar = 'Astro Shaw Sdn Bhd',       durasi_minit = 105, tarikh_hantar = '2025-10-12' WHERE no_permohonan = 'BEBAN-DEMO-001';
UPDATE ilpf_films SET tajuk = 'Projek: Memikat Suami 3',      pengedar = 'Primeworks Studios',        durasi_minit =  94, tarikh_hantar = '2025-10-20' WHERE no_permohonan = 'BEBAN-DEMO-002';
UPDATE ilpf_films SET tajuk = 'Sang Kancil: Lagenda Rimba',   pengedar = 'Les Copaque Production',    durasi_minit =  88, tarikh_hantar = '2025-11-03' WHERE no_permohonan = 'BEBAN-DEMO-003';
UPDATE ilpf_films SET tajuk = 'Paskal 2: Misi Hitam',         pengedar = 'Skop Productions',          durasi_minit = 118, tarikh_hantar = '2025-11-15' WHERE no_permohonan = 'BEBAN-DEMO-004';
UPDATE ilpf_films SET tajuk = 'Interchange: Bayang Gelap',    pengedar = 'KRU Studios',               durasi_minit = 112, tarikh_hantar = '2025-11-28' WHERE no_permohonan = 'BEBAN-DEMO-005';
UPDATE ilpf_films SET tajuk = 'Pulang: Kenangan Abadi',       pengedar = 'Astro Shaw Sdn Bhd',        durasi_minit =  96, tarikh_hantar = '2025-12-05' WHERE no_permohonan = 'BEBAN-DEMO-006';
UPDATE ilpf_films SET tajuk = 'Munafik 3',                    pengedar = 'Khabir Bhatia Productions', durasi_minit = 103, tarikh_hantar = '2025-12-14' WHERE no_permohonan = 'BEBAN-DEMO-007';
UPDATE ilpf_films SET tajuk = 'Ejen Ali: Misi Galaksi',       pengedar = 'Les Copaque Production',    durasi_minit =  92, tarikh_hantar = '2025-12-22' WHERE no_permohonan = 'BEBAN-DEMO-008';
UPDATE ilpf_films SET tajuk = 'Dukun 2: Bayangan Malam',      pengedar = 'Tayangan Unggul Sdn Bhd',   durasi_minit =  99, tarikh_hantar = '2026-01-08' WHERE no_permohonan = 'BEBAN-DEMO-009';
UPDATE ilpf_films SET tajuk = 'Mat Kilau: Semangat Pejuang',  pengedar = 'Primeworks Studios',        durasi_minit = 125, tarikh_hantar = '2026-01-16' WHERE no_permohonan = 'BEBAN-DEMO-010';
UPDATE ilpf_films SET tajuk = 'Kutukan Rimba Batu',           pengedar = 'Skop Productions',          durasi_minit =  97, tarikh_hantar = '2026-01-24' WHERE no_permohonan = 'BEBAN-DEMO-011';
UPDATE ilpf_films SET tajuk = 'Polis Evo: Operasi Merah',     pengedar = 'Astro Shaw Sdn Bhd',        durasi_minit = 110, tarikh_hantar = '2026-02-06' WHERE no_permohonan = 'BEBAN-DEMO-012';
UPDATE ilpf_films SET tajuk = 'Lelaki Harapan Dunia 2',       pengedar = 'Kewi Production',           durasi_minit =  95, tarikh_hantar = '2026-02-18' WHERE no_permohonan = 'BEBAN-DEMO-013';
UPDATE ilpf_films SET tajuk = 'KL Special Force 3',           pengedar = 'Tayangan Unggul Sdn Bhd',   durasi_minit = 108, tarikh_hantar = '2026-03-02' WHERE no_permohonan = 'BEBAN-DEMO-014';
UPDATE ilpf_films SET tajuk = 'Serigala Jahanam 2',           pengedar = 'Khabir Bhatia Productions', durasi_minit = 101, tarikh_hantar = '2026-03-15' WHERE no_permohonan = 'BEBAN-DEMO-015';

-- ─── 3. Fix assignment deadlines (avoid "Lewat" on demo day May 16–17) ────────

-- Assignment 3 = film 1 (Murugan: Dendam Tanah), main tapisan demo
UPDATE ilpf_assignments SET tarikh_tamat = '2026-05-20'
WHERE film_id = 1 AND user_id = 1 AND status = 'dalam_proses';

-- Assignment 4 = Sheriff trailer
UPDATE ilpf_assignments SET tarikh_tamat = '2026-05-22'
WHERE film_id = 4 AND user_id = 1 AND status = 'menunggu';

-- Assignment 5 = Inside Out 3
UPDATE ilpf_assignments SET tarikh_tamat = '2026-05-25'
WHERE film_id = 5 AND user_id = 1 AND status = 'menunggu';

-- ─── 4. Remove Yamunarani's leave on demo day (May 16) ───────────────────────

UPDATE ilpf_leave SET tarikh_mula = '2026-04-14', tarikh_tamat = '2026-04-14'
WHERE user_id = 2 AND tarikh_mula = '2026-05-16';

-- ─── 5. Extend ALPF member tenures (tamat was Jan 2026 = expired) ────────────

UPDATE ilpf_users
SET tamat = '2027-01-01', penggal = 'Kedua'
WHERE tamat = '2026-01-01' AND role = 'ahli';

-- ─── Verify ───────────────────────────────────────────────────────────────────

SELECT 'Films fixed' as check_item, COUNT(*) as count FROM ilpf_films WHERE tajuk LIKE '%Demo%' OR tajuk LIKE 'Dummy%';
SELECT 'Active members' as check_item, COUNT(*) as count FROM ilpf_users WHERE tamat > CURDATE() AND role = 'ahli';
SELECT 'Overdue open assignments' as check_item, COUNT(*) as count FROM ilpf_assignments WHERE status NOT IN ('selesai','lewat') AND tarikh_tamat < CURDATE();
SELECT 'Leave on May 16-17' as check_item, COUNT(*) as count FROM ilpf_leave WHERE tarikh_mula <= '2026-05-17' AND tarikh_tamat >= '2026-05-16';
