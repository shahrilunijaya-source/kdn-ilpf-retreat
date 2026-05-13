/* iLPF v2 — Mock data for the ALPF workspace
   Exposed as window.iLPF = { ... } so any script tag can read it.
   Swap with real endpoints in production. */

(function () {
  const today = new Date(2026, 4, 13); // Tuesday, 13 May 2026 (month is 0-indexed)

  const addDays = (n) => {
    const d = new Date(today); d.setDate(d.getDate() + n); return d;
  };
  const isoDate = (d) =>
    `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;

  // ---- ALPF identity (the logged-in user) -------------------------------
  const me = {
    name: "Encik Ridzuan bin Mohd Salleh",
    alpfId: "ALPF/2024/00128",
    avatar: null, // null → renders initials
    initials: "RM",
    expertise: ["Penyiaran", "Bahasa"],
    bahasa: "BM · BI · Tamil",
    pelantikan: new Date(2024, 6, 5),   // 5 Jul 2024
    tamat: new Date(2026, 6, 5),        // 5 Jul 2026 — 53 days from today (heavy state)
    penggal: "Pertama",
  };

  // ---- Pengumuman --------------------------------------------------------
  const pengumuman = [
    {
      id: "p-2026-mei-1",
      from: "KETUA UNIT",
      title: "Mesyuarat panel khas — 16 Mei 2026, 10.00 pagi.",
      body: "Semua ALPF Pita dijemput hadir. Agenda: pindaan Garis Panduan Penapisan 2026 Bab 4. Lokasi: Bilik Mesyuarat Utama, Aras 4.",
    },
    {
      id: "p-2026-mei-2",
      from: "PENGERUSI",
      title: "Cuti pertengahan tahun ALPF — kemaskini sebelum 30 Mei.",
      body: "Sila kemaskini permohonan cuti pertengahan tahun anda menerusi modul Cuti. Lewat hantar dianggap tiada permohonan.",
    },
  ];

  // ---- Tugasan hari ini / dalam tangan -----------------------------------
  // Lewat = late, esok = tomorrow, hadapan = future, selesai = done
  const tugasan = {
    heavy: [
      { id: "T-001", panel: "P1", late: true, daysLate: 1, title: "Dummy Film 21042026 Rayuan — 003",
        meta: "Filem · FBEN20260396995", role: "ketua",
        dueLabel: "Lewat 1 hari", dueSub: "Sepatutnya 22/04", cta: "Mula tapisan" },
      { id: "T-002", panel: "P1", late: true, daysLate: 1, title: "Data Refresher Course",
        meta: "Filem · FBAF20260397009", role: "ketua",
        dueLabel: "Lewat 1 hari", dueSub: "Sepatutnya 22/04", cta: "Mula tapisan" },
      { id: "T-003", panel: "P1", late: false, title: "Dummy Pita 10032026 Ckeditor 002",
        meta: "Pita · PCBM20260396966", role: "ketua",
        dueLabel: "Esok", dueSub: "15/05 · 5 hari sejak hantar", cta: "Sedia" },
      { id: "T-004", panel: "P2", late: false, title: "Sheriff: Narko-Integriti 2 — Trailer",
        meta: "Publisiti · BP2026000412", role: "ahli",
        dueLabel: "15 Mei", dueSub: "4 hari lagi", cta: "Sedia" },
      { id: "T-005", panel: "P3", late: false, title: "Inside Out 3 — Versi Dubbing BM",
        meta: "Filem · PCBM20260397042", role: "ahli",
        dueLabel: "18 Mei", dueSub: "7 hari lagi", cta: "Lihat" },
    ],
    normal: [
      { id: "T-101", panel: "P1", late: false, title: "Dummy Pita 10032026 Ckeditor 002",
        meta: "Pita · PCBM20260396966", role: "ketua",
        dueLabel: "Esok", dueSub: "15/05 · 5 hari sejak hantar", cta: "Sedia" },
      { id: "T-102", panel: "P2", late: false, title: "Sheriff: Narko-Integriti 2 — Trailer",
        meta: "Publisiti · BP2026000412", role: "ahli",
        dueLabel: "15 Mei", dueSub: "4 hari lagi", cta: "Sedia" },
      { id: "T-103", panel: "P3", late: false, title: "Inside Out 3 — Versi Dubbing BM",
        meta: "Filem · PCBM20260397042", role: "ahli",
        dueLabel: "18 Mei", dueSub: "7 hari lagi", cta: "Lihat" },
    ],
    calm: [],
    ending: [
      { id: "T-901", panel: "P1", late: false, title: "Polis Evo 4 — Versi Antarabangsa",
        meta: "Filem · PCBM20260397201", role: "ketua",
        dueLabel: "20 Mei", dueSub: "9 hari lagi", cta: "Sedia" },
      { id: "T-902", panel: "P2", late: false, title: "Iklan Petronas Tahun Baharu Cina 2026",
        meta: "Iklan · ICBM20260000353", role: "ahli",
        dueLabel: "22 Mei", dueSub: "11 hari lagi", cta: "Sedia" },
    ],
  };

  // ---- KPI per state -----------------------------------------------------
  const kpi = {
    heavy: {
      mingguIni: { value: "8 filem", sub: "14 jam 22 min skrin" },
      dalamTangan: { value: "5 tugasan", sub: "2 lewat · 3 dalam tempoh", warn: true },
      sla: { value: "88%", sub: "Purata 4 hari · di bawah Piagam", warn: true },
      ai: { value: "76%", sub: "23 daripada 30 diterima" },
    },
    normal: {
      mingguIni: { value: "6 filem", sub: "11 jam 08 min skrin" },
      dalamTangan: { value: "3 tugasan", sub: "0 lewat · 3 dalam tempoh" },
      sla: { value: "96%", sub: "Purata 2.4 hari · mengikut Piagam", ok: true },
      ai: { value: "82%", sub: "18 daripada 22 diterima" },
    },
    calm: {
      mingguIni: { value: "5 filem", sub: "9 jam 14 min skrin" },
      dalamTangan: { value: "0 tugasan", sub: "0 lewat · 0 dalam tempoh", ok: true },
      sla: { value: "98%", sub: "Purata 2.1 hari · mengikut Piagam", ok: true },
      ai: { value: "84%", sub: "21 daripada 25 diterima" },
    },
    ending: {
      mingguIni: { value: "4 filem", sub: "7 jam 50 min skrin" },
      dalamTangan: { value: "2 tugasan", sub: "0 lewat · 2 dalam tempoh" },
      sla: { value: "97%", sub: "Purata 2.2 hari · mengikut Piagam", ok: true },
      ai: { value: "81%", sub: "16 daripada 20 diterima" },
    },
  };

  // ---- Last completed task ----------------------------------------------
  const tugasanTerakhir = {
    title: "Polis Evo 4",
    keputusan: "Lulus dengan pengubahan",
    klasifikasi: "P13",
    timeAgo: "2 jam lalu",
  };

  // ---- Lifetime stats ---------------------------------------------------
  const lifetime = {
    filem: 142,
    jamSkrin: "284",
    sejak: "5 Julai 2024",
  };

  // ---- Baki cuti --------------------------------------------------------
  const baki = {
    rehat: { used: 9, total: 30 },
    sakit: { used: 2, total: 14 },
    menunggu: 1,
  };

  // ---- Tugasan Panggung dropdown ----------------------------------------
  const panggung = [
    {
      panggung: "Panggung 1",
      film: "Dummy Pita 10032026 Ckeditor 002",
      ids: "Pita · PCBM20260396966",
      role: "ketua",
      tarikh: "15 Mei 2026",
      masa: "10.00 pagi",
    },
    {
      panggung: "Panggung 3",
      film: "Inside Out 3 — Versi Dubbing BM",
      ids: "Filem · PCBM20260397042",
      role: "ahli",
      tarikh: "18 Mei 2026",
      masa: "2.30 petang",
    },
  ];

  // ---- Cuti / Mesyuarat Luar dropdown -----------------------------------
  const cutiMesyuarat = [
    {
      name: "Datin Yamunarani A/P R. Muthuthamby Pillay",
      from: "16 Mei",
      to: "16 Mei",
      type: "Mesyuarat: KURSUS INDUKSI ALPF",
    },
    {
      name: "Encik Ridzuan bin Mohd Salleh",
      self: true,
      from: "21 Mei",
      to: "21 Mei",
      type: "Cuti: temujanji hospital",
    },
    {
      name: "Dato Dr Nik Azmi Bin Nik Omar",
      from: "23 Mei",
      to: "25 Mei",
      type: "Cuti: cuti tahunan",
    },
  ];

  // ---- Cadangan AI (right rail) -----------------------------------------
  const cadanganAi = {
    heavy:   "Tugasan 'Dummy Film 21042026' sudah lewat 1 hari. Mulakan sebelum 11.00 pagi untuk pulih dalam Piagam.",
    normal:  "Tiga tugasan terbuka. Cadangan: mulakan 'Inside Out 3' selepas tengah hari — dubbing memerlukan pengesahan bahasa.",
    calm:    "Hari yang lapang. Anda boleh menyemak laporan prestasi anda atau membaca pengumuman terkini.",
    ending:  "Pelantikan tamat dalam 53 hari. Cadangan: serahkan 2 tugasan terbuka kepada Datin Yamunarani (kepakaran Bahasa selari).",
  };

  // ---- Calendar — markers for the current month ------------------------
  // d=day, t=task, c=cuti
  const kalendarMarkers = [
    { d: 13, t: true },
    { d: 14, t: true },
    { d: 15, t: true },
    { d: 16, c: true },
    { d: 18, t: true },
    { d: 19, t: true },
    { d: 20, t: true },
    { d: 21, c: true, t: true },
    { d: 23, c: true },
    { d: 24, c: true },
    { d: 25, c: true },
  ];

  // ---- Aku Janji statements ---------------------------------------------
  const akuJanji = [
    "Saya tidak mempunyai konflik kepentingan dengan saudara/sekutu dalam permohonan yang ditapis.",
    "Saya akan mengisytiharkan kepentingan kepada Pengerusi jika berlaku.",
    "Saya akur kepada tindakan tatatertib jika memungkiri pengakuan ini.",
  ];

  // ---- Sidebar IA --------------------------------------------------------
  const sidebar = [
    { kind: "item", id: "utama", label: "Utama", href: "Utama.html" },
    {
      kind: "group", id: "permohonan", label: "Permohonan",
      children: [
        {
          kind: "group", id: "perakuan-a", label: "Perakuan A",
          children: [
            {
              kind: "group", id: "pita", label: "Pita",
              children: [
                { kind: "item", id: "pita-senarai", label: "Senarai Permohonan Pita", href: "Stub.html?p=Senarai+Permohonan+Pita" },
                { kind: "item", id: "pita-pindaan", label: "Pindaan Pita", href: "Stub.html?p=Pindaan+Pita" },
                { kind: "item", id: "pita-sejarah", label: "Sejarah Tapisan Pita", href: "Stub.html?p=Sejarah+Tapisan+Pita" },
                { kind: "item", id: "pita-status", label: "Status Pita", href: "Stub.html?p=Status+Pita" },
                { kind: "item", id: "pita-tut", label: "Senarai TUT (PITA)", href: "Stub.html?p=Senarai+TUT" },
              ],
            },
            { kind: "item", id: "filem", label: "Filem", href: "Stub.html?p=Filem" },
            { kind: "item", id: "tapisan", label: "Tapisan", href: "Tapisan-Senarai.html" },
          ],
        },
        { kind: "item", id: "iklan", label: "Iklan", href: "Stub.html?p=Iklan" },
        { kind: "item", id: "publisiti", label: "Bahan Publisiti", href: "Stub.html?p=Bahan+Publisiti" },
        { kind: "item", id: "cetak", label: "Cetak Semula", href: "Stub.html?p=Cetak+Semula" },
      ],
    },
    {
      kind: "group", id: "stesen-tv", label: "Stesen TV",
      children: [
        { kind: "item", id: "tv-awesome", label: "Stesen TV Awesome", href: "Stub.html?p=Stesen+TV+Awesome" },
        { kind: "item", id: "tv-rtm", label: "Stesen TV RTM", href: "Stub.html?p=Stesen+TV+RTM" },
        { kind: "item", id: "tv-hijrah", label: "Stesen TV Al-Hijrah", href: "Stub.html?p=Stesen+TV+Al-Hijrah" },
        { kind: "item", id: "tv-unifi", label: "Stesen Unifi TV", href: "Stub.html?p=Stesen+Unifi+TV" },
        { kind: "item", id: "tv-sarawak", label: "Stesen TV Sarawak", href: "Stub.html?p=Stesen+TV+Sarawak" },
        { kind: "item", id: "tv-suke", label: "Stesen Suke TV", href: "Stub.html?p=Stesen+Suke+TV" },
        { kind: "item", id: "tv-enjoy", label: "Stesen ENJOY TV", href: "Stub.html?p=Stesen+ENJOY+TV" },
      ],
    },
    {
      kind: "group", id: "cuti", label: "Cuti",
      children: [
        { kind: "item", id: "cuti-mohon", label: "Mohon Cuti", href: "Stub.html?p=Mohon+Cuti" },
        { kind: "item", id: "cuti-senarai", label: "Senarai Permohonan Cuti", href: "Stub.html?p=Senarai+Permohonan+Cuti" },
        { kind: "item", id: "cuti-mesyuarat", label: "Mesyuarat / Latihan", href: "Stub.html?p=Mesyuarat+Latihan" },
      ],
    },
    {
      kind: "group", id: "sejarah", label: "Sejarah",
      children: [
        { kind: "item", id: "sejarah-ilpf", label: "Sejarah iLPF", href: "Stub.html?p=Sejarah+iLPF" },
        { kind: "item", id: "sejarah-efilem", label: "Sejarah eFilem", href: "Stub.html?p=Sejarah+eFilem" },
      ],
    },
    {
      kind: "group", id: "laporan", label: "Laporan",
      children: [
        { kind: "item", id: "lap-penapisan", label: "Laporan Penapisan", href: "Stub.html?p=Laporan+Penapisan" },
        { kind: "item", id: "lap-publisiti", label: "Laporan Bahan Publisiti", href: "Stub.html?p=Laporan+Bahan+Publisiti" },
        { kind: "item", id: "lap-prestasi", label: "Laporan Prestasi ALPF", href: "Stub.html?p=Laporan+Prestasi+ALPF" },
      ],
    },
    {
      kind: "group", id: "manual", label: "Manual Pengguna",
      children: [
        { kind: "item", id: "manual-alpf", label: "ALPF", href: "Stub.html?p=Manual+ALPF" },
      ],
    },
  ];

  // ---- Profile data: maklumat peribadi, akademik, pekerjaan, keluarga ---
  const profil = {
    peribadi: [
      { label: "Nama penuh", value: "Encik Ridzuan bin Mohd Salleh" },
      { label: "No. kad pengenalan", value: "780514-08-5423", priv: true },
      { label: "Umur", value: "47 tahun" },
      { label: "Jantina", value: "Lelaki" },
      { label: "Tarikh lahir", value: "14 Mei 1978" },
      { label: "Tempat lahir", value: "Taiping, Perak" },
      { label: "Bangsa", value: "Melayu" },
      { label: "Agama", value: "Islam" },
      { label: "Warna kad pengenalan", value: "Biru (Warganegara)" },
      { label: "Alamat", value: "No. 18, Jalan Damai 4/3, Taman Sri Damai, 47100 Puchong, Selangor", full: true },
      { label: "Negeri", value: "Selangor" },
      { label: "Daerah", value: "Petaling" },
      { label: "Poskod", value: "47100" },
      { label: "Nombor telefon", value: "03-8076 4532", priv: true },
      { label: "Nombor telefon bimbit", value: "+60 16-221 7576", priv: true },
      { label: "Emel", value: "ridzuan.salleh@kdn.gov.my", priv: true },
      { label: "Taraf perkahwinan", value: "Berkahwin" },
      { label: "Bahasa dikuasai", value: "BM (penutur asli) · BI (lancar) · Tamil (asas)", full: true },
    ],
    peranan: [
      "LPF",
      "LPF Stesen TV Pratonton",
      "LPF Stesen TV RTM",
      "Pegawai LPF Awesome",
      "Pegawai LPF Sarawak",
      "Pegawai LPF Suke",
      "Pegawai LPF ENJOY TV",
    ],
    prestasiLifetime: [
      { eyebrow: "FILEM DITAPIS", value: "142", sub: "284 jam skrin" },
      { eyebrow: "SLA PURATA", value: "94%", sub: "2.6 hari pemprosesan", ok: true },
      { eyebrow: "SESI KETUA PANEL", value: "86", sub: "56 sesi sebagai Ahli" },
      { eyebrow: "CADANGAN AI", value: "78%", sub: "143/183 diterima" },
    ],
    akademik: [
      { tahap: "Sarjana", institusi: "Universiti Malaya", bidang: "Pengajian Media & Komunikasi", tahun: "2008" },
      { tahap: "Ijazah", institusi: "Universiti Sains Malaysia", bidang: "Komunikasi (Penyiaran)", tahun: "2002" },
      { tahap: "Diploma", institusi: "Politeknik Ungku Omar", bidang: "Teknologi Penyiaran", tahun: "1998" },
    ],
    pekerjaan: [
      { jawatan: "Pegawai Penyiaran Kanan", organisasi: "RTM (Radio Televisyen Malaysia)", sektor: "Penyiaran Awam", dari: "2014", hingga: "Sekarang", desc: "Mengetuai unit pengawalan kandungan dan penjadualan tayangan TV1 & TV2." },
      { jawatan: "Penerbit Eksekutif", organisasi: "Astro Media", sektor: "Penyiaran Berbayar", dari: "2008", hingga: "2014", desc: "Penerbit drama bersiri untuk Astro Ria; bertanggungjawab ke atas pematuhan kandungan." },
      { jawatan: "Eksekutif Penyiaran", organisasi: "Media Prima Berhad", sektor: "Penyiaran Awam", dari: "2003", hingga: "2008", desc: "Pengurusan trafik dan inventori iklan untuk TV3." },
    ],
    keluarga: [
      { nama: "Puan Nurul Aisyah binti Hamid", hubungan: "Isteri", kp: "820318-10-5288", lahir: "18 Mac 1982" },
      { nama: "Ahmad Hakim bin Ridzuan", hubungan: "Anak (Lelaki)", kp: "100212-10-0123", lahir: "12 Februari 2010" },
      { nama: "Aisya Damia binti Ridzuan", hubungan: "Anak (Perempuan)", kp: "130509-10-0987", lahir: "9 Mei 2013" },
    ],
    sesi: [
      { device: "MacBook Pro · Safari", ip: "60.49.182.14 · Puchong, MY", last: "Aktif sekarang", current: true },
      { device: "iPhone 15 · Mobile Safari", ip: "60.49.182.14 · Puchong, MY", last: "2 jam lalu" },
      { device: "Windows 11 · Chrome", ip: "203.106.42.88 · KL Sentral", last: "3 hari lalu" },
    ],
  };

  // ---- Peer view data — what others see when they click this ALPF ------
  const peerView = {
    me: {
      name: me.name,
      since: "5 Julai 2024",
      penggal: "Pertama",
      expertise: me.expertise,
      bahasa: ["BM", "BI", "Tamil (asas)"],
    },
    beban: {
      tangan: 5,
      lewat: 2,
      mingguIni: 3,
    },
    kehadiran: {
      pct: 97,
      hadir: 86,
      tidakHadir: 2,
      lewatLapor: 1,
    },
    terkini: [
      { title: "Polis Evo 4", date: "11 Mei 2026", kls: "P13" },
      { title: "Upin & Ipin: Lagenda Pulau", date: "9 Mei 2026", kls: "U" },
      { title: "Sheriff: Narko-Integriti 2", date: "8 Mei 2026", kls: "18" },
    ],
  };

  // ---- Senarai Tapisan (full assignment queue) -------------------------
  const senaraiTapisan = [
    // === LEWAT ===
    { id: "T-001", panel: "P1", late: true, status: "lewat",
      title: "Dummy Film 21042026 Rayuan — 003",
      filmId: "FBEN20260396995", pengedar: "Astro Shaw Sdn Bhd", regNo: "1039592",
      tujuan: "Tayangan Pawagam", noPermohonan: "PCBM20260396995",
      role: "ketua", jenis: "Filem",
      dueLabel: "Lewat 1 hari", dueSub: "Sepatutnya 22/04", cta: "Mula tapisan" },
    { id: "T-002", panel: "P1", late: true, status: "lewat",
      title: "Data Refresher Course",
      filmId: "FBAF20260397009", pengedar: "Filem Negara Malaysia", regNo: "1039600",
      tujuan: "Tayangan Amal", noPermohonan: "PCBM20260397009",
      role: "ketua", jenis: "Filem",
      dueLabel: "Lewat 1 hari", dueSub: "Sepatutnya 22/04", cta: "Mula tapisan" },

    // === HARI INI / ESOK ===
    { id: "T-003", panel: "P1", status: "hari-ini",
      title: "Dummy Pita 10032026 Ckeditor 002",
      filmId: "PCBM20260396966", pengedar: "Network Twenty One", regNo: "1039575",
      tujuan: "Tayangan TV (Bukan VOD)", noPermohonan: "PCBM20260396966",
      role: "ketua", jenis: "Pita",
      dueLabel: "Esok", dueSub: "15/05 · 5 hari sejak hantar", cta: "Sambung" },

    // === MINGGU INI ===
    { id: "T-004", panel: "P2", status: "minggu-ini",
      title: "Sheriff: Narko-Integriti 2 — Trailer",
      filmId: "BP2026000412", pengedar: "Astro Shaw Sdn Bhd", regNo: "1039612",
      tujuan: "Bahan Publisiti", noPermohonan: "BPCBM20260000412",
      role: "ahli", jenis: "Publisiti",
      dueLabel: "15 Mei", dueSub: "4 hari lagi", cta: "Sedia" },
    { id: "T-005", panel: "P2", status: "minggu-ini",
      title: "Polis Evo 4 — Trailer Versi 2",
      filmId: "BP2026000419", pengedar: "Astro Shaw Sdn Bhd", regNo: "1039619",
      tujuan: "Bahan Publisiti", noPermohonan: "BPCBM20260000419",
      role: "ahli", jenis: "Publisiti",
      dueLabel: "15 Mei", dueSub: "4 hari lagi", cta: "Sedia" },
    { id: "T-006", panel: "P3", status: "minggu-ini",
      title: "Inside Out 3 — Versi Dubbing BM",
      filmId: "PCBM20260397042", pengedar: "Walt Disney Malaysia", regNo: "1039640",
      tujuan: "Tayangan Pawagam", noPermohonan: "PCBM20260397042",
      role: "ahli", jenis: "Filem",
      dueLabel: "18 Mei", dueSub: "7 hari lagi", cta: "Buka" },
    { id: "T-007", panel: "P3", status: "minggu-ini",
      title: "Drama Pilihan Malaya — Episod 8",
      filmId: "TV2026000287", pengedar: "RTM", regNo: "1039655",
      tujuan: "Tayangan TV (RTM)", noPermohonan: "TVCBM20260000287",
      role: "ketua", jenis: "TV",
      dueLabel: "19 Mei", dueSub: "8 hari lagi", cta: "Buka" },

    // === AKAN DATANG ===
    { id: "T-008", panel: "P4", status: "akan-datang",
      title: "Iklan Petronas Tahun Baharu Cina 2026",
      filmId: "I2026/02/0353", pengedar: "Naga DDB Tribal", regNo: "1039672",
      tujuan: "Iklan TV", noPermohonan: "ICBM20260000353",
      role: "ahli", jenis: "Iklan",
      dueLabel: "20 Mei", dueSub: "9 hari lagi", cta: "Buka" },
    { id: "T-009", panel: "P3", status: "akan-datang",
      title: "Mat Kilau: Pendekar Pahang",
      filmId: "PCBM20260396921", pengedar: "Studio Kembara", regNo: "1039688",
      tujuan: "Tayangan Pawagam", noPermohonan: "PCBM20260396921",
      role: "ahli", jenis: "Filem",
      dueLabel: "21 Mei", dueSub: "10 hari lagi", cta: "Buka" },
    { id: "T-010", panel: "P4", status: "akan-datang",
      title: "Iklan Tealive Ramadan 2026",
      filmId: "I2026/03/0411", pengedar: "Naga DDB Tribal", regNo: "1039701",
      tujuan: "Iklan TV", noPermohonan: "ICBM20260000411",
      role: "ahli", jenis: "Iklan",
      dueLabel: "23 Mei", dueSub: "12 hari lagi", cta: "Buka" },
    { id: "T-011", panel: "P3", status: "akan-datang",
      title: "Bercakap Dengan Jin: Episod Akhir",
      filmId: "PCBM20260397118", pengedar: "KRU Studios", regNo: "1039715",
      tujuan: "Tayangan Pawagam", noPermohonan: "PCBM20260397118",
      role: "ketua", jenis: "Filem",
      dueLabel: "25 Mei", dueSub: "14 hari lagi", cta: "Buka" },
    { id: "T-012", panel: "P4", status: "akan-datang",
      title: "Upin & Ipin Klasik — Pakej DVD",
      filmId: "PCBM20260397156", pengedar: "Les' Copaque Production", regNo: "1039728",
      tujuan: "Pita & DVD", noPermohonan: "PCBM20260397156",
      role: "ahli", jenis: "Pita",
      dueLabel: "26 Mei", dueSub: "15 hari lagi", cta: "Buka" },
    { id: "T-013", panel: "P2", status: "akan-datang",
      title: "Iklan Maybank Hari Raya Aidilfitri 2026",
      filmId: "I2026/03/0427", pengedar: "Leo Burnett Malaysia", regNo: "1039742",
      tujuan: "Iklan TV", noPermohonan: "ICBM20260000427",
      role: "ahli", jenis: "Iklan",
      dueLabel: "28 Mei", dueSub: "17 hari lagi", cta: "Buka" },
    { id: "T-014", panel: "P3", status: "akan-datang",
      title: "Drama Bersiri Awan Dania 3 — Episod 1",
      filmId: "TV2026000301", pengedar: "TV3 Media Prima", regNo: "1039755",
      tujuan: "Tayangan TV (Stesen Awam)", noPermohonan: "TVCBM20260000301",
      role: "ahli", jenis: "TV",
      dueLabel: "30 Mei", dueSub: "19 hari lagi", cta: "Buka" },
    { id: "T-015", panel: "P1", status: "akan-datang",
      title: "Saka — Versi Antarabangsa",
      filmId: "PCBM20260397201", pengedar: "Asia Tropical Films", regNo: "1039788",
      tujuan: "Tayangan Pawagam", noPermohonan: "PCBM20260397201",
      role: "ketua", jenis: "Filem",
      dueLabel: "2 Jun", dueSub: "22 hari lagi", cta: "Buka" },
    { id: "T-016", panel: "P4", status: "akan-datang",
      title: "Iklan Touch 'n Go eWallet — Versi Hari Gawai",
      filmId: "I2026/04/0489", pengedar: "DDB Group Malaysia", regNo: "1039812",
      tujuan: "Iklan TV", noPermohonan: "ICBM20260000489",
      role: "ahli", jenis: "Iklan",
      dueLabel: "4 Jun", dueSub: "24 hari lagi", cta: "Buka" },

    // === SELESAI ===
    { id: "T-901", panel: "✓", status: "selesai",
      title: "Polis Evo 4",
      filmId: "PCBM20260397001", pengedar: "Astro Shaw Sdn Bhd", regNo: "1039562",
      tujuan: "Tayangan Pawagam", noPermohonan: "PCBM20260397001",
      role: "ketua", jenis: "Filem",
      kls: "P13", keputusan: "Lulus dgn pengubahan", selesai: "2 jam lalu", cta: "Lihat" },
    { id: "T-902", panel: "✓", status: "selesai",
      title: "Upin & Ipin: Lagenda Pulau",
      filmId: "PCBM20260396852", pengedar: "Les' Copaque Production", regNo: "1039501",
      tujuan: "Tayangan Pawagam", noPermohonan: "PCBM20260396852",
      role: "ahli", jenis: "Filem",
      kls: "U", keputusan: "Lulus bersih", selesai: "11 Mei", cta: "Lihat" },
    { id: "T-903", panel: "✓", status: "selesai",
      title: "Sheriff: Narko-Integriti 2",
      filmId: "PCBM20260396789", pengedar: "Astro Shaw Sdn Bhd", regNo: "1039478",
      tujuan: "Tayangan Pawagam", noPermohonan: "PCBM20260396789",
      role: "ketua", jenis: "Filem",
      kls: "18", keputusan: "Lulus dgn pengubahan", selesai: "8 Mei", cta: "Lihat" },
    { id: "T-904", panel: "✓", status: "selesai",
      title: "Air Force One Down — Versi Dubbing",
      filmId: "PCBM20260396612", pengedar: "TGV Pictures", regNo: "1039410",
      tujuan: "Tayangan Pawagam", noPermohonan: "PCBM20260396612",
      role: "ahli", jenis: "Filem",
      kls: "16", keputusan: "Lulus dgn pengubahan", selesai: "5 Mei", cta: "Lihat" },
    { id: "T-905", panel: "✓", status: "selesai",
      title: "Drama Bersiri Cinta Sampai ke Syurga — Akhir",
      filmId: "TV2026000255", pengedar: "RTM", regNo: "1039402",
      tujuan: "Tayangan TV (RTM)", noPermohonan: "TVCBM20260000255",
      role: "ahli", jenis: "TV",
      kls: "P12", keputusan: "Lulus bersih", selesai: "3 Mei", cta: "Lihat" },
  ];

  // ---- Aliran Proses — 11 steps -----------------------------------------
  const aliranProses = [
    { n: 1, title: "Permohonan", role: "Syarikat menghantar permohonan", status: "done", ts: "08/03 14:22" },
    { n: 2, title: "Pembayaran", role: "Syarikat menyemak invois dan membuat pembayaran", status: "done", ts: "09/03 10:15" },
    { n: 3, title: "Pengesahan Bayaran", role: "Unit bayaran menyemak dan mengesahkan bayaran", status: "done", ts: "09/03 16:48" },
    { n: 4, title: "Pengesahan Media", role: "Unit Pita menerima dan menyemak bahan media", status: "done", ts: "10/03 09:30" },
    { n: 5, title: "Penukaran Format & Muat Naik", role: "Unit Pita menukar format dan muat naik", status: "done", ts: "10/03 10:18" },
    { n: 6, title: "Lantikan Panel", role: "Penyelaras melantik Ketua Panel", status: "done", ts: "10/03 10:51" },
    { n: 7, title: "Tapisan & Laporan", role: "Ketua Panel menonton dan menyediakan laporan", status: "current" },
    { n: 8, title: "Pengesahan Laporan", role: "Pengerusi menyemak dan mengesahkan laporan", status: "pending" },
    { n: 9, title: "Pembayaran Tambahan", role: "Syarikat menyemak invois dan membuat pembayaran tambahan", status: "pending" },
    { n: 10, title: "Pengesahan Bayaran Tambahan", role: "Unit bayaran menyemak dan mengesahkan bayaran", status: "pending" },
    { n: 11, title: "Selesai", role: "Syarikat mencetak laporan tapisan dan Perakuan A", status: "pending" },
  ];

  // ---- Tapisan Screen (the screening workspace) ------------------------
  const tapisanScreen = {
    info: {
      title: "Dummy Pita 10032026 Ckeditor 002",
      noPermohonan: "PCBM20260396966",
      perakuan: "Perakuan A Pita",
      pengedar: "Network Twenty One Sdn Bhd",
      filmId: "PCBM20260396966",
      tarikhHantar: "10 Mac 2026",
      jangkaan: "Esok · 15 Mei",
      kategori: ["Tayangan TV (Bukan VOD)", "Cereka", "Pita", "2 jam 56 min", "Tempatan", "DVD · MP4"],
    },
    aiPengubahan: [
      { bil: "01", dan: "00:01:30", hingga: "00:01:58", tindakan: "KABURKAN", adegan: "KEBOGELAN", desc: "Pendedahan bahagian atas badan", conf: 92 },
      { bil: "02", dan: "00:03:20", hingga: "00:03:49", tindakan: "POTONGKAN", adegan: "SEKSUAL", desc: "Adegan intim eksplisit + 2 profaniti", conf: 88 },
      { bil: "03", dan: "00:05:14", hingga: "00:05:42", tindakan: "SENYAPKAN", adegan: "SERAM", desc: "Audio jolt +9 LU; kurangkan peak −6 dB", conf: 91 },
      { bil: "04", dan: "00:07:08", hingga: "00:07:31", tindakan: "SENYAPKAN", adegan: "BAHASA", desc: "3 sebutan profaniti; sarikata diganti '[…]'", conf: 86 },
      { bil: "05", dan: "00:09:42", hingga: "00:10:13", tindakan: "POTONGKAN", adegan: "GANAS", desc: "Klimaks pukulan + darah; potong 11s", conf: 94 },
      { bil: "06", dan: "00:12:18", hingga: "00:12:36", tindakan: "PSA OVERLAY", adegan: "ROKOK", desc: "Pesanan kesihatan overlay 3s; tiada potongan", conf: 79 },
      { bil: "07", dan: "00:14:30", hingga: "00:14:58", tindakan: "SEMAK MANUAL", adegan: "AGAMA", desc: "Simbol agama dalam konteks sensitif", conf: 68 },
      { bil: "08", dan: "00:16:22", hingga: "00:16:58", tindakan: "KABURKAN", adegan: "JENAMA", desc: "2 jenama komersial dikesan tanpa pengisytiharan", conf: 81 },
    ],
    aiSinopsis: {
      text: "Murugan, seorang petani tua di selatan India, bergelut menghidupkan anak lelakinya Karthik yang malas. Selepas tragedi keluarga, Karthik menyusuri jejak ayahnya dan menemui rahsia gelap kampung yang berkait dengan dendam lama generasi terdahulu.",
      conf: 89,
      meta: "BM · 412 patah",
    },
    aiDialog: {
      text: "Komposisi bahasa: BM 78% · BI 18% · Tamil 4%. Sarikata: TIADA. 5 profaniti dikesan. Cadangan: senyapkan 5 sebutan; jana sarikata BM auto dari ASR; selaras GPPF KDN 2024.",
      conf: 82,
      meta: "ASR + OCR",
    },
    aiGenre: {
      text: "Berasaskan adegan, audio, dan dialog: Drama, Seram, Misteri. Aksi 42%, Thriller 38%.",
      conf: 91,
      top3: ["Drama", "Seram", "Misteri"],
      lower: [{ name: "Aksi", pct: 42 }, { name: "Thriller", pct: 38 }],
    },
    aiTema: {
      text: "Motif dikesan dari sinopsis + dialog: kekeluargaan dan dendam.",
      conf: 84,
      top3: ["Kekeluargaan", "Dendam", "Pengorbanan"],
      lower: [{ name: "Cinta", pct: 31 }, { name: "Persahabatan", pct: 27 }],
    },
    aiPanel: {
      text: "Cadangan berdasarkan kepakaran selari dengan kandungan filem.",
      conf: 87,
      members: [
        { name: "Datin Yamunarani A/P R. Muthuthamby Pillay", expertise: "Bahasa", attend: 99 },
        { name: "Dato Dr Nik Azmi Bin Nik Omar", expertise: "Keagamaan", attend: 97 },
      ],
    },
    aiKeputusan: {
      text: "Berasaskan 5 pengubahan diterima + adegan seram berkadar tinggi (4×) + profaniti sederhana (2×): Lulus Dengan Pengubahan, P13. Pemberat tertinggi: Ganas Sederhana, Seram Sederhana, Bahasa Sederhana.",
      conf: 88,
      keputusan: "LDP",
      klasifikasi: "13",
      pemberat: { ganas: 3, seram: 3, ngeri: 1, seksual: 2, kebogelan: 1, dadah: 0, rokok: 1, arak: 0, bahasa: 3, lain: 0 },
    },
    panelSemasa: {
      ketua: { name: "Encik Ridzuan bin Mohd Salleh", initials: "RM", expertise: "Penyiaran · Bahasa", attend: 97, beban: 3, self: true },
      ahli: [null, null],
    },
    kategoriBlur: [
      { id: "ganas", label: "Ganas", color: "#EF4444" },
      { id: "seram", label: "Seram", color: "#EC4899" },
      { id: "ngeri", label: "Ngeri", color: "#A855F7" },
      { id: "seksual", label: "Seksual", color: "#F97316" },
      { id: "kebogelan", label: "Kebogelan", color: "#FB923C" },
      { id: "dadah", label: "Dadah", color: "#6366F1" },
      { id: "rokok", label: "Rokok", color: "#F59E0B" },
      { id: "arak", label: "Arak", color: "#84CC16" },
      { id: "bahasa", label: "Bahasa", color: "#06B6D4" },
      { id: "agama", label: "Agama", color: "#D97706" },
      { id: "jenama", label: "Jenama", color: "#9CA3AF" },
    ],
    pemberatLabels: ["Tiada", "Sgt Ringan", "Ringan", "Sederhana", "Berat", "Sgt Berat", "Keterlaluan"],
    pemberatRows: [
      { id: "ganas", label: "Ganas" },
      { id: "seram", label: "Seram" },
      { id: "ngeri", label: "Ngeri" },
      { id: "seksual", label: "Seksual" },
      { id: "kebogelan", label: "Kebogelan" },
      { id: "dadah", label: "Dadah" },
      { id: "rokok", label: "Rokok" },
      { id: "arak", label: "Arak" },
      { id: "bahasa", label: "Bahasa: Dialog & Sari Kata" },
      { id: "lain", label: "Lain-lain" },
    ],
  };

  // ---- Pool of ALPF available to be picked as Ahli Panel ----------------
  const alpfPool = [
    { id: "alpf-001", name: "Datin Yamunarani A/P R. Muthuthamby Pillay", initials: "YR", expertise: ["Bahasa", "Tamil"], attend: 99, beban: 0, sejak: "2023" },
    { id: "alpf-002", name: "Dato Dr Nik Azmi Bin Nik Omar", initials: "NA", expertise: ["Keagamaan", "Pengajian Islam"], attend: 97, beban: 1, sejak: "2022" },
    { id: "alpf-003", name: "Encik Hairul Aizam bin Mohd Shariff", initials: "HA", expertise: ["Penguatkuasaan", "Undang-undang"], attend: 94, beban: 2, sejak: "2024" },
    { id: "alpf-004", name: "Puan Aishah binti Mahmud", initials: "AM", expertise: ["Pendidikan", "Psikologi"], attend: 96, beban: 1, sejak: "2023" },
    { id: "alpf-005", name: "Dr Lim Wei Sheng", initials: "LW", expertise: ["Perfileman", "Penyiaran"], attend: 92, beban: 3, sejak: "2022" },
    { id: "alpf-006", name: "Encik Mohd Faizal bin Abdullah", initials: "MF", expertise: ["Keagamaan", "Bahasa"], attend: 98, beban: 1, sejak: "2025" },
    { id: "alpf-007", name: "Puan Sarah Anak Kelvin", initials: "SK", expertise: ["Pendidikan", "Antropologi"], attend: 95, beban: 2, sejak: "2024" },
    { id: "alpf-008", name: "Encik Tan Boon Hock", initials: "TB", expertise: ["Penyiaran", "Cina (Mandarin)"], attend: 93, beban: 1, sejak: "2023" },
    { id: "alpf-009", name: "Dato' Profesor Dr Marina binti Yusoff", initials: "MY", expertise: ["Akademik", "Pengajian Media"], attend: 91, beban: 2, sejak: "2022" },
    { id: "alpf-010", name: "Tuan Ramachandran A/L Kalimuthu", initials: "RK", expertise: ["Tamil", "Komuniti India"], attend: 96, beban: 0, sejak: "2024" },
  ];

  // ---- Sejarah ILPF / eFilem records ------------------------------------
  const sejarahIlpf = [
    {
      id: "ilpf-2025-0844",
      title: "Sheriff: Narko-Integriti",
      year: 2024,
      tarikh: "12 Ogos 2024",
      kls: "18",
      keputusan: "LDP",
      ketua: "Encik Mohd Faizal bin Abdullah",
      pengubahan: 11,
      pemberat: "Ganas (5), Bahasa (4), Dadah (3)",
      note: "Adegan keganasan klimaks dipotong; sarikata BM dibetulkan.",
      similarity: 92,
    },
    {
      id: "ilpf-2024-0721",
      title: "Air Force One Down",
      year: 2024,
      tarikh: "3 Jun 2024",
      kls: "16",
      keputusan: "LDP",
      ketua: "Datin Yamunarani A/P R. Muthuthamby Pillay",
      pengubahan: 8,
      pemberat: "Ganas (4), Ngeri (3)",
      note: "Adegan pesawat jatuh diselit overlay PSA keselamatan.",
      similarity: 78,
    },
    {
      id: "ilpf-2024-0612",
      title: "Polis Evo 3 — Versi Dubbing",
      year: 2024,
      tarikh: "18 Apr 2024",
      kls: "P13",
      keputusan: "LDP",
      ketua: "Encik Ridzuan bin Mohd Salleh",
      pengubahan: 6,
      pemberat: "Ganas (3), Bahasa (3)",
      note: "Profaniti sarikata diganti '[…]'; tiada potongan visual.",
      similarity: 85,
    },
    {
      id: "ilpf-2023-1102",
      title: "Mat Kilau",
      year: 2022,
      tarikh: "30 Nov 2022",
      kls: "P13",
      keputusan: "LBP",
      ketua: "Dato Dr Nik Azmi Bin Nik Omar",
      pengubahan: 0,
      pemberat: "—",
      note: "Lulus bersih sebagai kandungan epik sejarah berunsur patriotik.",
      similarity: 64,
    },
    {
      id: "ilpf-2023-0908",
      title: "Bercakap Dengan Jin — Musim 2",
      year: 2023,
      tarikh: "9 Sep 2023",
      kls: "16",
      keputusan: "TUT",
      ketua: "Encik Hairul Aizam bin Mohd Shariff",
      pengubahan: 0,
      pemberat: "Seram (7), Agama (5)",
      note: "Penggambaran ritual agama sensitif yang tidak dapat diubah suai.",
      similarity: 71,
    },
  ];

  const sejarahEfilem = [
    {
      id: "ef-1184392",
      title: "The Wild Robot",
      year: 2024,
      origin: "Hollywood · DreamWorks",
      genre: "Animation · Adventure",
      rating: "PG (US)",
      runtime: "1j 42min",
      bo: "USD 324M sedunia",
      kdnIdentified: true,
      similarity: 14,
      note: "Versi BM dubbing dijangka September 2025.",
    },
    {
      id: "ef-1208411",
      title: "Sheriff: Narko-Integriti 2",
      year: 2026,
      origin: "Tempatan · Astro Shaw",
      genre: "Action · Crime · Drama",
      rating: "Belum diberi",
      runtime: "2j 12min",
      bo: "—",
      kdnIdentified: false,
      similarity: 95,
      note: "Sekuel langsung kepada filem 2024 yang ditapis sebagai 18 LDP.",
    },
    {
      id: "ef-1198872",
      title: "Inside Out 2",
      year: 2024,
      origin: "Hollywood · Pixar",
      genre: "Animation · Family",
      rating: "PG (US) · U (UK)",
      runtime: "1j 36min",
      bo: "USD 1.69B sedunia",
      kdnIdentified: true,
      similarity: 18,
      note: "Versi BM dubbing diluluskan U pada 14 Jun 2024.",
    },
    {
      id: "ef-1167203",
      title: "Polis Evo: International Cut",
      year: 2025,
      origin: "Tempatan · Astro Shaw",
      genre: "Action · Thriller",
      rating: "MA15+ (AU)",
      runtime: "2j 04min",
      bo: "—",
      kdnIdentified: false,
      similarity: 89,
      note: "Versi antarabangsa mengandungi 14 minit lanjutan + score baharu.",
    },
    {
      id: "ef-1132994",
      title: "Pulang",
      year: 2018,
      origin: "Tempatan · Primeworks",
      genre: "Drama · War",
      rating: "PG-13 (My)",
      runtime: "2j 04min",
      bo: "MYR 12.5M",
      kdnIdentified: true,
      similarity: 22,
      note: "Diluluskan P13 pada 2018 oleh ALPF Tempoh Lalu.",
    },
  ];

  window.iLPF = {
    today, addDays, isoDate,
    me, pengumuman, tugasan, kpi, tugasanTerakhir, lifetime, baki,
    panggung, cutiMesyuarat, cadanganAi, kalendarMarkers, akuJanji, sidebar,
    profil, peerView,
    senaraiTapisan, aliranProses,
    tapisanScreen, alpfPool,
    sejarahIlpf, sejarahEfilem,
  };
})();
