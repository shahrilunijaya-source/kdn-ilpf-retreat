-- iLPF v2 — ALPF Member Seed (46 members from v3 picker)
-- Skips: Datin Yamunarani (user 2) + Dato Dr Nik Azmi (user 3) — already in seed.sql
-- Password for all: ilpf2026
-- Run AFTER schema.sql and seed.sql

USE u958029070_ilpf;

INSERT IGNORE INTO ilpf_users
  (alpf_id, name, email, password_hash, role, initials, pelantikan, tamat, penggal)
VALUES
  ('ALPF/2021/00001', 'Abdul Hafeez bin Hamzah',                        'abdulhafeez.hamzah@kdn.gov.my',         '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'AH', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00002', 'Arjunaiti bin Abdullah',                          'arjunaiti.abdullah@kdn.gov.my',         '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'AA', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00003', 'Azidi bin Abdul Khahar',                          'azidi.khahar@kdn.gov.my',               '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'AK', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00004', 'Azreena binti Ahmad',                             'azreena.ahmad@kdn.gov.my',              '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'AA', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00005', 'Buvaneswary A/P Maniam @ Subramaniam',            'buvaneswary.maniam@kdn.gov.my',         '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'BS', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00006', 'Dato Mohd Aznor bin Mahat',                       'mohdaznor.mahat@kdn.gov.my',            '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'AM', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00007', 'Dato Sobri bin Ahmad',                            'sobri.ahmad@kdn.gov.my',                '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'SA', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00008', 'Datuk Ooi Kee Heng',                              'ooi.keeheng@kdn.gov.my',                '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'OK', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00009', 'Devaraj A/L Subramaniam',                         'devaraj.subramaniam@kdn.gov.my',        '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'DS', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00010', 'Dr. Ura A/P Pin @ Chum',                          'ura.chum@kdn.gov.my',                   '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'UC', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00011', 'Evans Ong Yih Jie',                               'evans.ong@kdn.gov.my',                  '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'EO', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00012', 'Fahmi Khawarizmi bin Mahmud',                     'fahmi.mahmud@kdn.gov.my',               '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'FM', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00013', 'Goh Saw Khim',                                    'goh.sawkhim@kdn.gov.my',                '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'GS', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00014', 'Hairiah binti Abdul Ghani',                       'hairiah.ghani@kdn.gov.my',              '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'HG', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00015', 'Hazlinda binti Hamzah',                           'hazlinda.hamzah@kdn.gov.my',            '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'HH', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00016', 'Irdawani binti Mohamad Selamat',                  'irdawani.selamat@kdn.gov.my',           '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'IS', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00017', 'Kepten (B) Veerakumar A/L Subbiah',               'veerakumar.subbiah@kdn.gov.my',         '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'VS', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00018', 'Kolonel Munraj Singh A/L Jughtar Singh (Bersara)','munraj.singh@kdn.gov.my',               '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'MS', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00019', 'Kumaresan A/L Karuppiah',                         'kumaresan.karuppiah@kdn.gov.my',        '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'KK', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00020', 'Lee Hao Jie',                                     'lee.haojie@kdn.gov.my',                 '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'LH', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00021', 'Lee Kum Yip',                                     'lee.kumyip@kdn.gov.my',                 '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'LK', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00022', 'Lt. Kdr (B) Md. Yusuf bin Hj. Ismail',           'yusuf.ismail@kdn.gov.my',               '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'YI', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00023', 'Marsila binti Sulaiman',                          'marsila.sulaiman@kdn.gov.my',           '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'MU', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00024', 'Masni binti Awang',                               'masni.awang@kdn.gov.my',                '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'MA', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00025', 'Mimi Hanirul Sazni binti Mohd Sadali',            'mimi.sadali@kdn.gov.my',                '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'MM', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00026', 'Mohd Fazli bin Mohd Haron',                       'mohdfazli.haron@kdn.gov.my',            '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'MF', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00027', 'Mohd Firdaus bin Abdul Rahim',                    'mohdfirdaus.rahim@kdn.gov.my',          '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'MR', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00028', 'Mustapa bin Mohammad Yasin',                      'mustapa.yasin@kdn.gov.my',              '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'MY', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00029', 'Muzamir bin Saboo',                               'muzamir.saboo@kdn.gov.my',              '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'MZ', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00030', 'Noor Hafiza binti Hasan',                         'noorhafiza.hasan@kdn.gov.my',           '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'NH', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00031', 'Nor Atikah binti Ab Ghani',                       'noratikah.ghani@kdn.gov.my',            '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'NA', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00032', 'Nur Jannahkhairunnisa bt Md Said',                'nurjannah.said@kdn.gov.my',             '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'NJ', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00033', 'Oi Chu Kim Ting @ Rezuoi bin Abdullah',           'oichukim.abdullah@kdn.gov.my',          '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'OC', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00034', 'Ong Bee Leng',                                    'ong.beeleng@kdn.gov.my',                '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'OB', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00035', 'Punidha A/P N. Paliah',                           'punidha.paliah@kdn.gov.my',             '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'PP', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00036', 'Ranga Rao A/L Simadari Naidu',                    'rangrao.naidu@kdn.gov.my',              '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'RN', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00037', 'Ruszidah binti Limat',                            'ruszidah.limat@kdn.gov.my',             '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'RL', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00038', 'Saiful Asidi bin Johari',                         'saifulasidi.johari@kdn.gov.my',         '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'SJ', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00039', 'Shafeezul bin Din',                               'shafeezul.din@kdn.gov.my',              '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'SD', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00040', 'Sia Soh Guad',                                    'sia.sohguad@kdn.gov.my',                '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'SS', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00041', 'Sofia Lim binti Abdullah',                        'sofialim.abdullah@kdn.gov.my',          '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'SL', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00042', 'Stella Stephen Chin',                             'stella.chin@kdn.gov.my',                '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'SC', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00043', 'Thava Rajan A/L Subramaniam',                     'thavarajan.subramaniam@kdn.gov.my',     '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'TS', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00044', 'Tohit bin Hj. Sidek',                             'tohit.sidek@kdn.gov.my',                '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'TH', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00045', 'Tuan Haji Mohamad Khir bin Mat Lazim',            'mohamadkhir.lazim@kdn.gov.my',          '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'MK', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00046', 'Wooi Kooi Cheang',                                'wooi.kooicheang@kdn.gov.my',            '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'WK', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00047', 'YM. Engku Mohamed Khairy Azwi bin Rozalay',       'mohamedkhairy.rozalay@kdn.gov.my',      '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'EK', '2021-01-01', '2026-01-01', 'Pertama'),
  ('ALPF/2021/00048', 'Zuraidi bin Mohd Johan',                          'zuraidi.johan@kdn.gov.my',              '$2y$12$1kETyPcgYqY4M9sFipnfqOV8xZm.zuHz/iZsHQgTP6AWtFrayqWDW', 'ahli', 'ZJ', '2021-01-01', '2026-01-01', 'Pertama');
