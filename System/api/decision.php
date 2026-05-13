<?php
require_once __DIR__ . '/../config.php';
Auth::requireApi();
Response::method('GET', 'POST', 'PUT');

$method       = $_SERVER['REQUEST_METHOD'];
$assignmentId = (int)($_GET['assignment_id'] ?? 0);
$uid          = Auth::id();

if (!$assignmentId) Response::error('assignment_id diperlukan.');

$ok = Db::val(
    "SELECT id FROM ilpf_assignments WHERE id = ? AND user_id = ?",
    [$assignmentId, $uid]
);
if (!$ok) Response::error('Tugasan tidak dijumpai.', 404);

if ($method === 'GET') {
    $d = Db::row("SELECT * FROM ilpf_decisions WHERE assignment_id = ?", [$assignmentId]);
    Response::ok($d);
}

if ($method === 'POST' || $method === 'PUT') {
    $b     = Response::body();
    $exist = Db::row("SELECT id FROM ilpf_decisions WHERE assignment_id = ?", [$assignmentId]);

    $keputusan   = $b['keputusan']   ?? null;
    $klasifikasi = $b['klasifikasi'] ?? null;
    $catatan     = $b['catatan']     ?? null;
    $pemberat    = $b['pemberat']    ?? null;
    $status      = $b['status']      ?? 'draf';

    $validKeputusan   = ['LBP','LDP','TUT'];
    $validKlasifikasi = ['U','P12','13','16','18','18PL','18SG','18PA'];
    $validStatus      = ['draf','hantar','disahkan'];

    if ($keputusan && !in_array($keputusan, $validKeputusan, true))     Response::error('Keputusan tidak sah.');
    if ($klasifikasi && !in_array($klasifikasi, $validKlasifikasi, true)) Response::error('Klasifikasi tidak sah.');
    if (!in_array($status, $validStatus, true))                          Response::error('Status tidak sah.');

    $pemberatJson = $pemberat ? json_encode($pemberat) : null;

    if ($exist) {
        Db::q(
            "UPDATE ilpf_decisions
             SET keputusan = ?, klasifikasi = ?, catatan = ?, pemberat = ?, status = ?, updated_at = NOW()
             WHERE assignment_id = ?",
            [$keputusan, $klasifikasi, $catatan, $pemberatJson, $status, $assignmentId]
        );
        Response::ok(['id' => $exist['id']]);
    } else {
        Db::q(
            "INSERT INTO ilpf_decisions (assignment_id, keputusan, klasifikasi, catatan, pemberat, status, created_by)
             VALUES (?, ?, ?, ?, ?, ?, ?)",
            [$assignmentId, $keputusan, $klasifikasi, $catatan, $pemberatJson, $status, $uid]
        );
        Response::ok(['id' => Db::lastId()]);
    }
}
