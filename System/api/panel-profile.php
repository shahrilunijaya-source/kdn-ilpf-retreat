<?php
require_once '../config/session.php';
require_once '../config/db.php';
require_once '../lib/Auth.php';
require_once '../lib/Db.php';
require_once '../lib/Response.php';

Auth::require();

$uid = (int)($_GET['user_id'] ?? 0);
if (!$uid) { Response::bad('Missing user_id'); exit; }

$lewat = (int)Db::val(
    "SELECT COUNT(*) FROM ilpf_assignments WHERE user_id = ? AND status = 'lewat'", [$uid]
);
$minggu_ini = (int)Db::val(
    "SELECT COUNT(*) FROM ilpf_assignments
     WHERE user_id = ? AND YEARWEEK(tarikh_tamat, 1) = YEARWEEK(CURDATE(), 1)", [$uid]
);
$selesai = (int)Db::val(
    "SELECT COUNT(*) FROM ilpf_assignments WHERE user_id = ? AND status = 'selesai'", [$uid]
);

$tapisan = Db::rows(
    "SELECT f.tajuk, f.tarikh_hantar, f.ai_keputusan
     FROM ilpf_assignments a
     JOIN ilpf_films f ON f.id = a.film_id
     WHERE a.user_id = ?
     ORDER BY a.id DESC
     LIMIT 3",
    [$uid]
);

$terkini = array_map(function ($t) {
    $kep = $t['ai_keputusan'] ? json_decode($t['ai_keputusan'], true) : null;
    return [
        'tajuk'        => $t['tajuk'],
        'tarikh'       => $t['tarikh_hantar'] ? date('j M Y', strtotime($t['tarikh_hantar'])) : '',
        'klasifikasi'  => $kep['klasifikasi'] ?? null,
    ];
}, $tapisan);

Response::json([
    'lewat'           => $lewat,
    'minggu_ini'      => $minggu_ini,
    'selesai'         => $selesai,
    'lewat_laporan'   => $lewat,
    'tapisan_terkini' => $terkini,
]);
