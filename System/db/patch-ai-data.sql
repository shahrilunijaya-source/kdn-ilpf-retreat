-- Patch: set AI data for Murugan film on live DB
-- Run against: u958029070_ilpf
-- Safe to re-run (idempotent UPDATE by no_permohonan)

USE u958029070_ilpf;

UPDATE ilpf_films SET
  ai_sinopsis   = '{"text":"Murugan, seorang petani tua di selatan India, bergelut menghidupkan anak lelakinya Karthik yang malas. Selepas tragedi keluarga, Karthik menyusuri jejak ayahnya dan menemui rahsia gelap kampung yang berkait dengan dendam lama generasi terdahulu.","conf":89,"meta":"BM · 412 patah"}',
  ai_dialog     = '{"text":"Komposisi bahasa: BM 78% · BI 18% · Tamil 4%. Sarikata: TIADA. 5 profaniti dikesan. Cadangan: senyapkan 5 sebutan; jana sarikata BM auto dari ASR; selaras GPPF KDN 2024.","conf":82,"meta":"ASR + OCR"}',
  ai_genre      = '{"text":"Berasaskan adegan, audio, dan dialog: Drama, Seram, Misteri. Aksi 42%, Thriller 38%.","conf":91,"top3":["Drama","Seram","Misteri"],"lower":[{"name":"Aksi","pct":42},{"name":"Thriller","pct":38}]}',
  ai_tema       = '{"text":"Motif dikesan dari sinopsis + dialog: kekeluargaan dan dendam.","conf":84,"top3":["Kekeluargaan","Dendam","Pengorbanan"],"lower":[{"name":"Cinta","pct":31},{"name":"Persahabatan","pct":27}]}',
  ai_panel      = '{"text":"Cadangan berdasarkan kepakaran selari dengan kandungan filem.","conf":87,"members":[{"name":"Datin Yamunarani A/P R. Muthuthamby Pillay","expertise":"Bahasa","attend":99},{"name":"Dato Dr Nik Azmi Bin Nik Omar","expertise":"Keagamaan","attend":97}]}',
  ai_pengubahan = '[{"bil":"01","dan":"00:01:30","hingga":"00:01:58","tindakan":"KABURKAN","adegan":"KEBOGELAN","desc":"Pendedahan bahagian atas badan","conf":92},{"bil":"02","dan":"00:03:20","hingga":"00:03:49","tindakan":"POTONGKAN","adegan":"SEKSUAL","desc":"Adegan intim eksplisit + 2 profaniti","conf":88},{"bil":"03","dan":"00:05:14","hingga":"00:05:42","tindakan":"SENYAPKAN","adegan":"SERAM","desc":"Audio jolt +9 LU; kurangkan peak -6 dB","conf":91},{"bil":"04","dan":"00:07:08","hingga":"00:07:31","tindakan":"SENYAPKAN","adegan":"BAHASA","desc":"3 sebutan profaniti; sarikata diganti \'[…]\'","conf":86},{"bil":"05","dan":"00:09:42","hingga":"00:10:13","tindakan":"POTONGKAN","adegan":"GANAS","desc":"Klimaks pukulan + darah; potong 11s","conf":94},{"bil":"06","dan":"00:12:18","hingga":"00:12:36","tindakan":"PSA OVERLAY","adegan":"ROKOK","desc":"Pesanan kesihatan overlay 3s; tiada potongan","conf":79},{"bil":"07","dan":"00:14:30","hingga":"00:14:58","tindakan":"SEMAK MANUAL","adegan":"AGAMA","desc":"Simbol agama dalam konteks sensitif","conf":68},{"bil":"08","dan":"00:16:22","hingga":"00:16:58","tindakan":"KABURKAN","adegan":"JENAMA","desc":"2 jenama komersial dikesan tanpa pengisytiharan","conf":81}]',
  ai_keputusan  = '{"text":"Berasaskan 5 pengubahan diterima + adegan seram berkadar tinggi (4x) + profaniti sederhana (2x): Lulus Dengan Pengubahan, P13. Pemberat tertinggi: Ganas Sederhana, Seram Sederhana, Bahasa Sederhana.","conf":88,"keputusan":"LDP","klasifikasi":"13","pemberat":{"ganas":3,"seram":3,"ngeri":1,"seksual":2,"kebogelan":1,"dadah":0,"rokok":1,"arak":0,"bahasa":3,"lain":0}}'
WHERE no_permohonan = 'PCBM20260396966';

SELECT ROW_COUNT() AS rows_updated;
