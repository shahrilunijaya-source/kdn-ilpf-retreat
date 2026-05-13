<?php
declare(strict_types=1);

class IlpfData
{
    private int   $uid;
    private array $user;

    public function __construct(int $userId)
    {
        $this->uid  = $userId;
        $this->user = Auth::user();
    }

    // ─── MAIN BUILD — full window.iLPF object ─────────────────────────────────

    public function build(string $page = 'dashboard'): array
    {
        $user  = $this->user;
        $uid   = $this->uid;
        $today = date('Y-m-d');

        $daysLeft = (int)(( strtotime($user['tamat']) - strtotime($today)) / 86400);

        $pendingCount = (int)Db::val(
            "SELECT COUNT(*) FROM ilpf_assignments WHERE user_id = ? AND status IN ('menunggu','dalam_proses')",
            [$uid]
        );
        $lateCount = (int)Db::val(
            "SELECT COUNT(*) FROM ilpf_assignments
             WHERE user_id = ? AND status NOT IN ('selesai') AND tarikh_tamat < CURDATE()",
            [$uid]
        );

        $state = $this->computeState($daysLeft, $pendingCount, $lateCount);
        $tod   = $this->computeTod();

        $expertise = $this->decodeJson($user['expertise'], []);
        $akuJanjiSigned = !empty($user['aku_janji_signed_at']);

        $me = [
            'name'      => $user['name'],
            'alpfId'    => $user['alpf_id'],
            'avatar'    => $user['avatar_url'],
            'initials'  => $user['initials'] ?? $this->initials($user['name']),
            'expertise' => $expertise,
            'bahasa'    => $user['bahasa'] ?? '',
            'pelantikan'=> $user['pelantikan'],
            'tamat'     => $user['tamat'],
            'penggal'   => $user['penggal'],
            'daysLeft'  => $daysLeft,
        ];

        $pengumuman = Db::rows(
            "SELECT id, from_label as `from`, title, body
             FROM ilpf_announcements ORDER BY created_at DESC LIMIT 10"
        );

        $rawAssignments = $this->fetchAssignments();
        $senaraiTapisan = array_map([$this, 'mapAssignment'], $rawAssignments);

        $activeTasks = array_values(array_filter($senaraiTapisan, fn($t) => $t['status'] !== 'selesai'));

        $completedThisWeek = (int)Db::val(
            "SELECT COUNT(*) FROM ilpf_assignments
             WHERE user_id = ? AND status = 'selesai' AND updated_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)",
            [$uid]
        );
        $totalFilm = (int)Db::val(
            "SELECT COUNT(*) FROM ilpf_assignments WHERE user_id = ? AND status = 'selesai'", [$uid]
        );
        $totalMins = (float)Db::val(
            "SELECT COALESCE(SUM(f.durasi_minit), 0)
             FROM ilpf_assignments a JOIN ilpf_films f ON f.id = a.film_id
             WHERE a.user_id = ? AND a.status = 'selesai'",
            [$uid]
        );
        $aiTotal    = (int)Db::val(
            "SELECT COUNT(*) FROM ilpf_edits e
             JOIN ilpf_assignments a ON a.id = e.assignment_id
             WHERE a.user_id = ? AND e.source = 'ai'", [$uid]
        );
        $aiAccepted = (int)Db::val(
            "SELECT COUNT(*) FROM ilpf_edits e
             JOIN ilpf_assignments a ON a.id = e.assignment_id
             WHERE a.user_id = ? AND e.source = 'ai' AND e.status = 'diterima'", [$uid]
        );
        $aiPct = $aiTotal > 0 ? (int)round($aiAccepted / $aiTotal * 100) : 0;

        $cutiTahunan = (int)Db::val(
            "SELECT COUNT(*) FROM ilpf_leave WHERE user_id = ? AND jenis = 'tahunan'
             AND status = 'lulus' AND YEAR(tarikh_mula) = YEAR(CURDATE())", [$uid]
        );
        $cutiSakit = (int)Db::val(
            "SELECT COUNT(*) FROM ilpf_leave WHERE user_id = ? AND jenis = 'sakit'
             AND status = 'lulus' AND YEAR(tarikh_mula) = YEAR(CURDATE())", [$uid]
        );
        $cutiMenunggu = (int)Db::val(
            "SELECT COUNT(*) FROM ilpf_leave WHERE user_id = ? AND status = 'menunggu'", [$uid]
        );

        $panggung = $this->buildPanggung($senaraiTapisan);
        $cutiMesyuarat = $this->buildCutiMesyuarat();
        $lastDone = $this->lastDone();
        $kalendarMarkers = $this->buildCalendar();
        $alpfPool = $this->buildAlpfPool();
        $profil = $this->buildProfil($aiPct, $aiAccepted, $aiTotal, $totalFilm, $totalMins);
        $sejarahIlpf = $this->buildSejarahIlpf();

        $slaOnTime = (int)Db::val(
            "SELECT COUNT(*) FROM ilpf_assignments
             WHERE user_id = ? AND status = 'selesai'
               AND YEAR(updated_at) = YEAR(CURDATE()) AND MONTH(updated_at) = MONTH(CURDATE())
               AND updated_at <= tarikh_tamat",
            [$uid]
        );
        $slaTotal = (int)Db::val(
            "SELECT COUNT(*) FROM ilpf_assignments
             WHERE user_id = ? AND status = 'selesai'
               AND YEAR(updated_at) = YEAR(CURDATE()) AND MONTH(updated_at) = MONTH(CURDATE())",
            [$uid]
        );
        $slaPct = $slaTotal > 0 ? (int)round($slaOnTime / $slaTotal * 100) : null;

        $kpi = $this->buildKpi($state, $pendingCount, $lateCount, $completedThisWeek, $aiPct, $aiAccepted, $aiTotal, $slaPct, $slaTotal);

        $cadanganAi = [
            'heavy'   => $lateCount > 0
                ? "Anda mempunyai {$lateCount} tugasan lewat. Sila selesaikan sebelum tengah hari untuk pulih dalam Piagam."
                : "{$pendingCount} tugasan terbuka. Cadangan: selesaikan tugasan paling lewat dahulu.",
            'normal'  => "{$pendingCount} tugasan terbuka. Semak jadual anda untuk hari ini.",
            'calm'    => "Hari yang lapang. Anda boleh menyemak laporan prestasi anda atau membaca pengumuman terkini.",
            'ending'  => "Pelantikan tamat dalam {$daysLeft} hari. Selesaikan tugasan terbuka sebelum tarikh tamat.",
        ];

        return [
            'state'          => $state,
            'tod'            => $tod,
            'showAkuJanji'   => !$akuJanjiSigned,
            'me'             => $me,
            'pengumuman'     => $pengumuman,
            'tugasan'        => [$state => $activeTasks],
            'kpi'            => [$state => $kpi],
            'tugasanTerakhir'=> $lastDone,
            'lifetime'       => [
                'filem'    => $totalFilm,
                'jamSkrin' => (string)round($totalMins / 60),
                'sejak'    => date('j F Y', strtotime($user['pelantikan'])),
            ],
            'baki' => [
                'rehat'    => ['used' => $cutiTahunan, 'total' => 30],
                'sakit'    => ['used' => $cutiSakit,   'total' => 14],
                'menunggu' => $cutiMenunggu,
            ],
            'panggung'       => $panggung,
            'cutiMesyuarat'  => $cutiMesyuarat,
            'cadanganAi'     => $cadanganAi,
            'kalendarMarkers'=> $kalendarMarkers,
            'akuJanji'       => [
                'Saya tidak mempunyai konflik kepentingan dengan saudara/sekutu dalam permohonan yang ditapis.',
                'Saya akan mengisytiharkan kepentingan kepada Pengerusi jika berlaku.',
                'Saya akur kepada tindakan tatatertib jika memungkiri pengakuan ini.',
            ],
            'sidebar'        => $this->buildSidebar(),
            'profil'         => $profil,
            'peerView'       => $this->buildPeerView($me, $activeTasks, $lateCount, $completedThisWeek, $totalFilm),
            'senaraiTapisan' => $senaraiTapisan,
            'aliranProses'   => $this->buildAliranProses(),
            'tapisanScreen'  => null,
            'alpfPool'       => $alpfPool,
            'sejarahIlpf'    => $sejarahIlpf,
            'sejarahEfilem'  => [],
        ];
    }

    // ─── TAPISAN SCREEN DATA (for Tapisan.php?id=X) ───────────────────────────

    public function buildTapisanScreen(int $assignmentId): ?array
    {
        $uid = $this->uid;
        $a = Db::row(
            "SELECT a.*, f.tajuk, f.no_permohonan, f.pengedar, f.film_ref,
                    f.tujuan, f.tarikh_hantar, f.jenis, f.durasi_minit, f.video_path,
                    f.kategori, f.ai_sinopsis, f.ai_dialog, f.ai_genre, f.ai_tema,
                    f.ai_panel, f.ai_pengubahan, f.ai_keputusan
             FROM ilpf_assignments a
             JOIN ilpf_films f ON f.id = a.film_id
             WHERE a.id = ? AND a.user_id = ?",
            [$assignmentId, $uid]
        );
        if (!$a) return null;

        // Active edits from DB
        $edits = Db::rows(
            "SELECT e.*, u.name as created_by_name FROM ilpf_edits e
             JOIN ilpf_users u ON u.id = e.created_by
             WHERE e.assignment_id = ? ORDER BY e.bil ASC",
            [$assignmentId]
        );

        $aiEdits = array_filter($edits, fn($e) => $e['source'] === 'ai');
        $manualEdits = array_filter($edits, fn($e) => $e['source'] === 'manual');

        // Panel members
        $panel = Db::rows(
            "SELECT p.role, u.name, u.initials, u.expertise, u.id = ? as self_flag,
                    (SELECT COUNT(*) FROM ilpf_assignments WHERE user_id = u.id AND status IN ('menunggu','dalam_proses')) as beban
             FROM ilpf_panels p JOIN ilpf_users u ON u.id = p.user_id
             WHERE p.assignment_id = ?",
            [$uid, $assignmentId]
        );

        $ketua = null;
        $ahli  = [];
        foreach ($panel as $p) {
            $member = [
                'name'      => $p['name'],
                'initials'  => $p['initials'] ?? $this->initials($p['name']),
                'expertise' => $this->decodeJson($p['expertise'], []),
                'attend'    => 97,
                'beban'     => (int)$p['beban'],
                'self'      => (bool)$p['self_flag'],
            ];
            if ($p['role'] === 'ketua') $ketua = $member;
            else $ahli[] = $member;
        }
        while (count($ahli) < 2) $ahli[] = null;

        // Decision
        $decision = Db::row(
            "SELECT * FROM ilpf_decisions WHERE assignment_id = ?", [$assignmentId]
        );

        return [
            'assignmentId' => $assignmentId,
            'info' => [
                'title'        => $a['tajuk'],
                'noPermohonan' => $a['no_permohonan'],
                'perakuan'     => 'Perakuan A ' . $a['jenis'],
                'pengedar'     => $a['pengedar'],
                'filmId'       => $a['film_ref'],
                'tarikhHantar' => $a['tarikh_hantar']
                    ? date('j M Y', strtotime($a['tarikh_hantar'])) : null,
                'jangkaan'     => date('j M', strtotime($a['tarikh_tamat'])),
                'kategori'     => $this->decodeJson($a['kategori'], []),
                'videoPPath'   => $a['video_path'],
            ],
            'aiPengubahan' => array_values(array_map(fn($e) => [
                'id'       => $e['id'],
                'bil'      => sprintf('%02d', $e['bil']),
                'dan'      => $e['ts_mula'],
                'hingga'   => $e['ts_tamat'],
                'tindakan' => $e['tindakan'],
                'adegan'   => $e['adegan'],
                'desc'     => $e['description'],
                'conf'     => (int)$e['conf'],
                'status'   => $e['status'],
            ], $aiEdits)),
            'manualPengubahan' => array_values(array_map(fn($e) => [
                'id'       => $e['id'],
                'bil'      => sprintf('%02d', $e['bil']),
                'dan'      => $e['ts_mula'],
                'hingga'   => $e['ts_tamat'],
                'tindakan' => $e['tindakan'],
                'adegan'   => $e['adegan'],
                'desc'     => $e['description'],
                'status'   => $e['status'],
            ], $manualEdits)),
            'aiSinopsis'  => $this->decodeJson($a['ai_sinopsis']) ?? [
                'text' => 'Analisis AI sedang diproses. Cadangan sinopsis akan tersedia sebentar lagi.',
                'conf' => 0, 'meta' => 'Belum dianalisis',
            ],
            'aiDialog'    => $this->decodeJson($a['ai_dialog']) ?? [
                'text' => 'Analisis dialog dan sarikata sedang diproses.',
                'conf' => 0, 'meta' => 'Belum dianalisis',
            ],
            'aiGenre'     => $this->decodeJson($a['ai_genre']) ?? [
                'text' => 'Analisis genre sedang diproses.',
                'conf' => 0, 'top3' => [], 'lower' => [],
            ],
            'aiTema'      => $this->decodeJson($a['ai_tema']) ?? [
                'text' => 'Analisis tema sedang diproses.',
                'conf' => 0, 'top3' => [], 'lower' => [],
            ],
            'aiPanel'     => $this->decodeJson($a['ai_panel']) ?? [
                'text' => 'Cadangan panel sedang diproses.',
                'conf' => 0, 'members' => [],
            ],
            'aiKeputusan' => $this->decodeJson($a['ai_keputusan']) ?? [
                'text' => 'Keputusan AI sedang diproses.',
                'conf' => 0, 'keputusan' => null, 'klasifikasi' => null,
                'pemberat' => ['ganas'=>0,'seram'=>0,'ngeri'=>0,'seksual'=>0,'kebogelan'=>0,'dadah'=>0,'rokok'=>0,'arak'=>0,'bahasa'=>0,'lain'=>0],
            ],
            'panelSemasa' => [
                'ketua' => $ketua,
                'ahli'  => array_slice($ahli, 0, 2),
            ],
            'decision'    => $decision ? [
                'keputusan'   => $decision['keputusan'],
                'klasifikasi' => $decision['klasifikasi'],
                'catatan'     => $decision['catatan'],
                'pemberat'    => $this->decodeJson($decision['pemberat'], []),
                'status'      => $decision['status'],
            ] : null,
            'kategoriBlur' => [
                ['id'=>'ganas',    'label'=>'Ganas',    'color'=>'#EF4444'],
                ['id'=>'seram',    'label'=>'Seram',    'color'=>'#EC4899'],
                ['id'=>'ngeri',    'label'=>'Ngeri',    'color'=>'#A855F7'],
                ['id'=>'seksual',  'label'=>'Seksual',  'color'=>'#F97316'],
                ['id'=>'kebogelan','label'=>'Kebogelan','color'=>'#FB923C'],
                ['id'=>'dadah',    'label'=>'Dadah',    'color'=>'#6366F1'],
                ['id'=>'rokok',    'label'=>'Rokok',    'color'=>'#F59E0B'],
                ['id'=>'arak',     'label'=>'Arak',     'color'=>'#84CC16'],
                ['id'=>'bahasa',   'label'=>'Bahasa',   'color'=>'#06B6D4'],
                ['id'=>'agama',    'label'=>'Agama',    'color'=>'#D97706'],
                ['id'=>'jenama',   'label'=>'Jenama',   'color'=>'#9CA3AF'],
            ],
            'pemberatLabels' => ['Tiada','Sgt Ringan','Ringan','Sederhana','Berat','Sgt Berat','Keterlaluan'],
            'pemberatRows'   => [
                ['id'=>'ganas',    'label'=>'Ganas'],
                ['id'=>'seram',    'label'=>'Seram'],
                ['id'=>'ngeri',    'label'=>'Ngeri'],
                ['id'=>'seksual',  'label'=>'Seksual'],
                ['id'=>'kebogelan','label'=>'Kebogelan'],
                ['id'=>'dadah',    'label'=>'Dadah'],
                ['id'=>'rokok',    'label'=>'Rokok'],
                ['id'=>'arak',     'label'=>'Arak'],
                ['id'=>'bahasa',   'label'=>'Bahasa: Dialog & Sari Kata'],
                ['id'=>'lain',     'label'=>'Lain-lain'],
            ],
        ];
    }

    // ─── HELPERS ──────────────────────────────────────────────────────────────

    private function fetchAssignments(): array
    {
        return Db::rows(
            "SELECT a.id, a.role, a.panel_no as panel, a.tarikh_tamat, a.status,
                    f.tajuk, f.no_permohonan, f.jenis, f.film_ref as filmId,
                    f.pengedar, f.tujuan
             FROM ilpf_assignments a
             JOIN ilpf_films f ON f.id = a.film_id
             WHERE a.user_id = ?
             ORDER BY FIELD(a.status,'lewat','dalam_proses','menunggu','selesai'), a.tarikh_tamat ASC",
            [$this->uid]
        );
    }

    private function mapAssignment(array $a): array
    {
        $today    = date('Y-m-d');
        $tamat    = $a['tarikh_tamat'];
        $daysLate = (int)((strtotime($today) - strtotime($tamat)) / 86400);
        $daysLeft = (int)((strtotime($tamat) - strtotime($today)) / 86400);
        $late     = ($a['status'] === 'lewat') || ($daysLate > 0 && $a['status'] !== 'selesai');

        if ($a['status'] === 'selesai') {
            $statusKey = 'selesai';
            $dueLabel  = 'Selesai';
            $dueSub    = date('j M', strtotime($tamat));
            $cta       = 'Lihat';
        } elseif ($late) {
            $statusKey = 'lewat';
            $dueLabel  = "Lewat $daysLate hari";
            $dueSub    = 'Sepatutnya ' . date('d/m', strtotime($tamat));
            $cta       = 'Mula tapisan';
        } elseif ($daysLeft <= 1) {
            $statusKey = 'hari-ini';
            $dueLabel  = 'Esok';
            $dueSub    = date('d/m', strtotime($tamat));
            $cta       = 'Sambung';
        } elseif ($daysLeft <= 7) {
            $statusKey = 'minggu-ini';
            $dueLabel  = date('j M', strtotime($tamat));
            $dueSub    = "$daysLeft hari lagi";
            $cta       = 'Sedia';
        } else {
            $statusKey = 'akan-datang';
            $dueLabel  = date('j M', strtotime($tamat));
            $dueSub    = "$daysLeft hari lagi";
            $cta       = 'Buka';
        }

        return [
            'id'           => 'T-' . $a['id'],
            'dbId'         => $a['id'],
            'panel'        => $a['panel'],
            'late'         => $late,
            'status'       => $statusKey,
            'title'        => $a['tajuk'],
            'filmId'       => $a['filmId'],
            'noPermohonan' => $a['no_permohonan'],
            'pengedar'     => $a['pengedar'],
            'tujuan'       => $a['tujuan'],
            'role'         => $a['role'],
            'jenis'        => $a['jenis'],
            'dueLabel'     => $dueLabel,
            'dueSub'       => $dueSub,
            'cta'          => $cta,
        ];
    }

    private function buildPanggung(array $senaraiTapisan): array
    {
        $active = array_filter($senaraiTapisan, fn($t) => in_array($t['status'], ['hari-ini','minggu-ini','lewat','dalam_proses']));
        return array_values(array_map(fn($a) => [
            'panggung' => 'Panggung ' . ltrim($a['panel'], 'P'),
            'film'     => $a['title'],
            'ids'      => $a['jenis'] . ' · ' . $a['noPermohonan'],
            'role'     => $a['role'],
            'tarikh'   => date('j M Y', strtotime($a['dueSub'] === 'Esok' ? '+1 day' : 'now')),
            'masa'     => '10.00 pagi',
        ], $active));
    }

    private function buildCutiMesyuarat(): array
    {
        $uid = $this->uid;
        $rows = Db::rows(
            "SELECT l.jenis, l.perihal, l.tarikh_mula, l.tarikh_tamat,
                    u.name, u.id = ? as self_flag
             FROM ilpf_leave l JOIN ilpf_users u ON u.id = l.user_id
             WHERE l.status = 'lulus' AND l.tarikh_tamat >= CURDATE()
               AND l.tarikh_mula <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
             ORDER BY l.tarikh_mula ASC LIMIT 10",
            [$uid]
        );
        return array_map(fn($c) => [
            'name' => $c['name'],
            'self' => (bool)$c['self_flag'],
            'from' => date('j M', strtotime($c['tarikh_mula'])),
            'to'   => date('j M', strtotime($c['tarikh_tamat'])),
            'type' => ucfirst($c['jenis']) . ': ' . ($c['perihal'] ?? $c['jenis']),
        ], $rows);
    }

    private function lastDone(): ?array
    {
        $r = Db::row(
            "SELECT f.tajuk as title, d.keputusan, d.klasifikasi,
                    CONCAT(GREATEST(TIMESTAMPDIFF(HOUR, a.updated_at, NOW()), 1), ' jam lalu') as timeAgo
             FROM ilpf_assignments a
             JOIN ilpf_films f ON f.id = a.film_id
             LEFT JOIN ilpf_decisions d ON d.assignment_id = a.id
             WHERE a.user_id = ? AND a.status = 'selesai'
             ORDER BY a.updated_at DESC LIMIT 1",
            [$this->uid]
        );
        return $r ?: null;
    }

    private function buildCalendar(): array
    {
        $uid   = $this->uid;
        $month = date('Y-m');
        $markers = [];
        $tasks = Db::rows(
            "SELECT DAY(tarikh_tamat) as d FROM ilpf_assignments
             WHERE user_id = ? AND DATE_FORMAT(tarikh_tamat,'%Y-%m') = ? AND status NOT IN ('selesai')",
            [$uid, $month]
        );
        foreach ($tasks as $t) {
            $d = (int)$t['d'];
            $markers[$d] ??= ['d' => $d];
            $markers[$d]['t'] = true;
        }
        $leaves = Db::rows(
            "SELECT tarikh_mula, tarikh_tamat FROM ilpf_leave
             WHERE user_id = ? AND status = 'lulus'
               AND tarikh_tamat >= DATE_FORMAT(CURDATE(),'%Y-%m-01')
               AND tarikh_mula  <= LAST_DAY(CURDATE())",
            [$uid]
        );
        foreach ($leaves as $l) {
            $s = max(1, (int)date('j', strtotime($l['tarikh_mula'])));
            $e = min((int)date('t'), (int)date('j', strtotime($l['tarikh_tamat'])));
            for ($d = $s; $d <= $e; $d++) {
                $markers[$d] ??= ['d' => $d];
                $markers[$d]['c'] = true;
            }
        }
        return array_values($markers);
    }

    private function buildAlpfPool(): array
    {
        $uid = $this->uid;
        $rows = Db::rows(
            "SELECT u.id, u.name, u.initials, u.expertise, u.pelantikan, u.penggal,
                    (SELECT COUNT(*) FROM ilpf_assignments WHERE user_id = u.id AND status IN ('menunggu','dalam_proses')) as beban
             FROM ilpf_users u
             WHERE u.id != ? AND u.role IN ('ahli','ketua','pengerusi')
             ORDER BY u.name ASC",
            [$uid]
        );
        return array_map(fn($u) => [
            'id'        => 'alpf-' . $u['id'],
            'userId'    => (int)$u['id'],
            'name'      => $u['name'],
            'initials'  => $u['initials'] ?? $this->initials($u['name']),
            'expertise' => $this->decodeJson($u['expertise'], []),
            'attend'    => 95,
            'beban'     => (int)$u['beban'],
            'sejak'     => date('Y', strtotime($u['pelantikan'])),
            'penggal'   => $u['penggal'] ?? 'Pertama',
        ], $rows);
    }

    private function buildPeerView(array $me, array $activeTasks, int $lateCount, int $completedThisWeek, int $totalFilm): array
    {
        $uid = $this->uid;

        $terkiniRows = Db::rows(
            "SELECT f.tajuk, a.updated_at, d.klasifikasi
             FROM ilpf_assignments a
             JOIN ilpf_films f ON f.id = a.film_id
             LEFT JOIN ilpf_decisions d ON d.assignment_id = a.id
             WHERE a.user_id = ? AND a.status = 'selesai'
             ORDER BY a.updated_at DESC LIMIT 3",
            [$uid]
        );
        $terkini = array_map(fn($r) => [
            'title' => $r['tajuk'],
            'date'  => date('j M Y', strtotime($r['updated_at'])),
            'kls'   => $r['klasifikasi'] ?? 'P13',
        ], $terkiniRows);

        $bahasa = $this->decodeJson($me['bahasa'] ?? '', []);
        if (empty($bahasa) && !empty($me['bahasa'])) {
            $bahasa = array_map('trim', explode(',', $me['bahasa']));
        }

        $penggalMap = ['1' => 'Pertama', '2' => 'Kedua', '3' => 'Ketiga', '4' => 'Keempat', '5' => 'Kelima'];
        $penggalLabel = $penggalMap[(string)$me['penggal']] ?? $me['penggal'];

        $total = $totalFilm + count($activeTasks);
        $pct   = $total > 0 ? (int)round($totalFilm / $total * 100) : 100;

        return [
            'me' => [
                'name'      => $me['name'],
                'since'     => date('j F Y', strtotime($me['pelantikan'])),
                'penggal'   => $penggalLabel,
                'expertise' => $me['expertise'],
                'bahasa'    => $bahasa,
            ],
            'beban' => [
                'tangan'    => count($activeTasks),
                'lewat'     => $lateCount,
                'mingguIni' => $completedThisWeek,
            ],
            'kehadiran' => [
                'pct'        => $pct,
                'hadir'      => $totalFilm,
                'tidakHadir' => 0,
                'lewatLapor' => $lateCount,
            ],
            'terkini' => $terkini,
        ];
    }

    private function buildProfil(int $aiPct, int $aiAccepted, int $aiTotal, int $totalFilm, float $totalMins): array
    {
        $uid = $this->uid;
        $peranan  = Db::rows("SELECT peranan FROM ilpf_user_peranan WHERE user_id = ? ORDER BY id", [$uid]);
        $akademik = Db::rows("SELECT tahap, institusi, bidang, tahun FROM ilpf_user_akademik WHERE user_id = ? ORDER BY sort_order", [$uid]);
        $kerja    = Db::rows("SELECT jawatan, organisasi, sektor, dari, hingga, description FROM ilpf_user_pekerjaan WHERE user_id = ? ORDER BY sort_order", [$uid]);
        $keluarga = Db::rows("SELECT nama, hubungan, no_kp as kp, tarikh_lahir FROM ilpf_user_keluarga WHERE user_id = ? ORDER BY sort_order", [$uid]);

        $token = isset($_SESSION['session_token']) ? hash('sha256', $_SESSION['session_token']) : '';
        $sesi = Db::rows(
            "SELECT device, ip, location, DATE_FORMAT(last_at,'%d %M %Y %H:%i') as last,
                    token_hash = ? as current_flag
             FROM ilpf_sessions WHERE user_id = ? AND expires_at > NOW()
             ORDER BY last_at DESC LIMIT 10",
            [$token, $uid]
        );

        $u = $this->user;
        $peribadi = array_filter([
            ['label'=>'Nama penuh',                'value'=>$u['name']],
            $u['no_kp']         ? ['label'=>'No. kad pengenalan',      'value'=>$u['no_kp'], 'priv'=>true] : null,
            $u['umur']          ? ['label'=>'Umur',                    'value'=>$u['umur'] . ' tahun'] : null,
            $u['jantina']       ? ['label'=>'Jantina',                 'value'=>$u['jantina']] : null,
            $u['tarikh_lahir']  ? ['label'=>'Tarikh lahir',            'value'=>date('j F Y', strtotime($u['tarikh_lahir']))] : null,
            $u['tempat_lahir']  ? ['label'=>'Tempat lahir',            'value'=>$u['tempat_lahir']] : null,
            $u['bangsa']        ? ['label'=>'Bangsa',                  'value'=>$u['bangsa']] : null,
            $u['agama']         ? ['label'=>'Agama',                   'value'=>$u['agama']] : null,
            $u['warna_kp']      ? ['label'=>'Warna kad pengenalan',    'value'=>$u['warna_kp']] : null,
            $u['alamat']        ? ['label'=>'Alamat',                  'value'=>$u['alamat'], 'full'=>true] : null,
            $u['negeri']        ? ['label'=>'Negeri',                  'value'=>$u['negeri']] : null,
            $u['daerah']        ? ['label'=>'Daerah',                  'value'=>$u['daerah']] : null,
            $u['poskod']        ? ['label'=>'Poskod',                  'value'=>$u['poskod']] : null,
            $u['tel']           ? ['label'=>'Nombor telefon',          'value'=>$u['tel'],     'priv'=>true] : null,
            $u['tel_bimbit']    ? ['label'=>'Nombor telefon bimbit',   'value'=>$u['tel_bimbit'], 'priv'=>true] : null,
            ['label'=>'Emel',                      'value'=>$u['email'], 'priv'=>true],
            $u['taraf_kahwin']  ? ['label'=>'Taraf perkahwinan',       'value'=>$u['taraf_kahwin']] : null,
            $u['bahasa']        ? ['label'=>'Bahasa dikuasai',         'value'=>$u['bahasa'], 'full'=>true] : null,
        ]);

        return [
            'peribadi' => array_values($peribadi),
            'peranan'  => array_column($peranan, 'peranan'),
            'prestasiLifetime' => [
                ['eyebrow'=>'FILEM DITAPIS',   'value'=>(string)$totalFilm, 'sub'=>round($totalMins/60).' jam skrin'],
                ['eyebrow'=>'SLA PURATA',      'value'=>'94%',              'sub'=>'2.6 hari pemprosesan', 'ok'=>true],
                ['eyebrow'=>'SESI KETUA PANEL','value'=>'0',                'sub'=>'0 sesi sebagai Ahli'],
                ['eyebrow'=>'CADANGAN AI',     'value'=>$aiPct.'%',         'sub'=>"{$aiAccepted}/{$aiTotal} diterima"],
            ],
            'akademik' => $akademik,
            'pekerjaan'=> array_map(fn($k) => [
                'jawatan'     => $k['jawatan'],
                'organisasi'  => $k['organisasi'],
                'sektor'      => $k['sektor'],
                'dari'        => $k['dari'],
                'hingga'      => $k['hingga'],
                'desc'        => $k['description'],
            ], $kerja),
            'keluarga' => array_map(fn($k) => [
                'nama'     => $k['nama'],
                'hubungan' => $k['hubungan'],
                'kp'       => $k['kp'],
                'lahir'    => $k['tarikh_lahir'] ? date('j F Y', strtotime($k['tarikh_lahir'])) : null,
            ], $keluarga),
            'sesi' => array_map(fn($s) => [
                'device'  => $s['device'],
                'ip'      => $s['ip'] . ($s['location'] ? ' · ' . $s['location'] : ''),
                'last'    => $s['last'],
                'current' => (bool)$s['current_flag'],
            ], $sesi),
        ];
    }

    private function buildSejarahIlpf(): array
    {
        return Db::rows(
            "SELECT a.id, f.tajuk as title, YEAR(a.updated_at) as year,
                    DATE_FORMAT(a.updated_at,'%d %M %Y') as tarikh,
                    d.klasifikasi as kls, d.keputusan,
                    u.name as ketua,
                    (SELECT COUNT(*) FROM ilpf_edits e WHERE e.assignment_id = a.id) as pengubahan
             FROM ilpf_assignments a
             JOIN ilpf_films f ON f.id = a.film_id
             JOIN ilpf_users u ON u.id = a.user_id
             LEFT JOIN ilpf_decisions d ON d.assignment_id = a.id
             WHERE a.user_id = ? AND a.status = 'selesai'
             ORDER BY a.updated_at DESC LIMIT 20",
            [$this->uid]
        );
    }

    private function buildKpi(string $state, int $pending, int $late, int $week, int $aiPct, int $aiAcc, int $aiTotal, ?int $slaPct = null, int $slaTotal = 0): array
    {
        $slaValue = $slaPct !== null ? $slaPct . '%' : '—';
        $slaSub   = $slaPct !== null ? "{$slaTotal} tapisan bulan ini" : 'Belum dikira';
        return [
            'mingguIni'   => ['value' => "$week filem",    'sub'  => 'minggu ini'],
            'dalamTangan' => [
                'value' => "$pending tugasan",
                'sub'   => "{$late} lewat · " . max(0, $pending - $late) . ' dalam tempoh',
                'warn'  => $late > 0,
                'ok'    => $late === 0 && $pending > 0,
            ],
            'sla' => ['value' => $slaValue, 'sub' => $slaSub, 'ok' => $slaPct !== null && $slaPct >= 90],
            'ai'  => ['value' => $aiPct . '%', 'sub' => "{$aiAcc} daripada {$aiTotal} diterima"],
        ];
    }

    private function buildAliranProses(): array
    {
        return [
            ['n'=>1,  'title'=>'Permohonan',               'role'=>'Syarikat menghantar permohonan',                         'status'=>'done',    'ts'=>''],
            ['n'=>2,  'title'=>'Pembayaran',                'role'=>'Syarikat menyemak invois dan membuat pembayaran',        'status'=>'done',    'ts'=>''],
            ['n'=>3,  'title'=>'Pengesahan Bayaran',        'role'=>'Unit bayaran menyemak dan mengesahkan bayaran',          'status'=>'done',    'ts'=>''],
            ['n'=>4,  'title'=>'Pengesahan Media',          'role'=>'Unit Pita menerima dan menyemak bahan media',            'status'=>'done',    'ts'=>''],
            ['n'=>5,  'title'=>'Penukaran Format & Muat Naik','role'=>'Unit Pita menukar format dan muat naik',               'status'=>'done',    'ts'=>''],
            ['n'=>6,  'title'=>'Lantikan Panel',            'role'=>'Penyelaras melantik Ketua Panel',                       'status'=>'done',    'ts'=>''],
            ['n'=>7,  'title'=>'Tapisan & Laporan',         'role'=>'Ketua Panel menonton dan menyediakan laporan',           'status'=>'current'],
            ['n'=>8,  'title'=>'Pengesahan Laporan',        'role'=>'Pengerusi menyemak dan mengesahkan laporan',             'status'=>'pending'],
            ['n'=>9,  'title'=>'Pembayaran Tambahan',       'role'=>'Syarikat menyemak invois dan membuat pembayaran tambahan','status'=>'pending'],
            ['n'=>10, 'title'=>'Pengesahan Bayaran Tambahan','role'=>'Unit bayaran menyemak dan mengesahkan bayaran',         'status'=>'pending'],
            ['n'=>11, 'title'=>'Selesai',                   'role'=>'Syarikat mencetak laporan tapisan dan Perakuan A',       'status'=>'pending'],
        ];
    }

    private function buildSidebar(): array
    {
        return [
            ['kind'=>'item', 'id'=>'utama', 'label'=>'Utama', 'href'=>'Utama.php'],
            ['kind'=>'group','id'=>'permohonan','label'=>'Permohonan','children'=>[
                ['kind'=>'group','id'=>'perakuan-a','label'=>'Perakuan A','children'=>[
                    ['kind'=>'group','id'=>'pita','label'=>'Pita','children'=>[
                        ['kind'=>'item','id'=>'pita-senarai','label'=>'Senarai Permohonan Pita','href'=>'Stub.php?p=Senarai+Permohonan+Pita'],
                        ['kind'=>'item','id'=>'pita-pindaan','label'=>'Pindaan Pita','href'=>'Stub.php?p=Pindaan+Pita'],
                        ['kind'=>'item','id'=>'pita-sejarah','label'=>'Sejarah Tapisan Pita','href'=>'Stub.php?p=Sejarah+Tapisan+Pita'],
                        ['kind'=>'item','id'=>'pita-status','label'=>'Status Pita','href'=>'Stub.php?p=Status+Pita'],
                        ['kind'=>'item','id'=>'pita-tut','label'=>'Senarai TUT (PITA)','href'=>'Stub.php?p=Senarai+TUT'],
                    ]],
                    ['kind'=>'item','id'=>'filem','label'=>'Filem','href'=>'Stub.php?p=Filem'],
                    ['kind'=>'item','id'=>'tapisan','label'=>'Tapisan','href'=>'Tapisan-Senarai.php'],
                ]],
                ['kind'=>'item','id'=>'iklan','label'=>'Iklan','href'=>'Stub.php?p=Iklan'],
                ['kind'=>'item','id'=>'publisiti','label'=>'Bahan Publisiti','href'=>'Stub.php?p=Bahan+Publisiti'],
            ]],
            ['kind'=>'group','id'=>'stesen-tv','label'=>'Stesen TV','children'=>[
                ['kind'=>'item','id'=>'tv-rtm','label'=>'Stesen TV RTM','href'=>'Stub.php?p=Stesen+TV+RTM'],
                ['kind'=>'item','id'=>'tv-awesome','label'=>'Stesen TV Awesome','href'=>'Stub.php?p=Stesen+TV+Awesome'],
            ]],
            ['kind'=>'group','id'=>'cuti','label'=>'Cuti','children'=>[
                ['kind'=>'item','id'=>'cuti-mohon','label'=>'Mohon Cuti','href'=>'Stub.php?p=Mohon+Cuti'],
                ['kind'=>'item','id'=>'cuti-senarai','label'=>'Senarai Permohonan Cuti','href'=>'Stub.php?p=Senarai+Permohonan+Cuti'],
            ]],
            ['kind'=>'group','id'=>'laporan','label'=>'Laporan','children'=>[
                ['kind'=>'item','id'=>'lap-penapisan','label'=>'Laporan Penapisan','href'=>'Stub.php?p=Laporan+Penapisan'],
                ['kind'=>'item','id'=>'lap-prestasi','label'=>'Laporan Prestasi ALPF','href'=>'Laporan.php'],
            ]],
            ['kind'=>'group','id'=>'manual','label'=>'Manual Pengguna','children'=>[
                ['kind'=>'item','id'=>'manual-alpf','label'=>'ALPF','href'=>'Stub.php?p=Manual+ALPF'],
            ]],
        ];
    }

    private function computeState(int $daysLeft, int $pending, int $late): string
    {
        if ($daysLeft < 90)                     return 'ending';
        if ($late >= 1 || $pending >= 4)        return 'heavy';
        if ($pending >= 2)                      return 'normal';
        return 'calm';
    }

    private function computeTod(): string
    {
        $h = (int)date('G');
        if ($h < 12)       return 'pagi';
        if ($h < 14)       return 'tengah-hari';
        if ($h < 19)       return 'petang';
        return 'malam';
    }

    private function initials(string $name): string
    {
        $parts = preg_split('/\s+/', $name);
        $out   = '';
        foreach ($parts as $p) {
            if (ctype_upper($p[0] ?? '')) $out .= $p[0];
        }
        return substr($out, 0, 2) ?: strtoupper(substr($name, 0, 2));
    }

    private function decodeJson(mixed $v, mixed $default = null): mixed
    {
        if ($v === null) return $default;
        if (is_array($v)) return $v;
        $decoded = json_decode($v, true);
        return ($decoded !== null) ? $decoded : $default;
    }
}
