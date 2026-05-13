<?php
require_once __DIR__ . '/../config.php';
Auth::requireApi();
Response::method('GET', 'POST', 'PUT', 'DELETE');

$method       = $_SERVER['REQUEST_METHOD'];
$assignmentId = (int)($_GET['assignment_id'] ?? 0);
$uid          = Auth::id();

// Verify the assignment belongs to this user
if ($assignmentId) {
    $ok = Db::val(
        "SELECT id FROM ilpf_assignments WHERE id = ? AND user_id = ?",
        [$assignmentId, $uid]
    );
    if (!$ok) Response::error('Tugasan tidak dijumpai.', 404);
}

if ($method === 'GET') {
    if (!$assignmentId) Response::error('assignment_id diperlukan.');
    $rows = Db::rows(
        "SELECT id, bil, source, ts_mula, ts_tamat, tindakan, adegan,
                description, conf, status, created_at
         FROM ilpf_edits WHERE assignment_id = ? ORDER BY bil ASC",
        [$assignmentId]
    );
    Response::ok($rows);
}

if ($method === 'POST') {
    $b = Response::body();
    if (!$assignmentId) Response::error('assignment_id diperlukan.');
    $tindakan = strtoupper(trim($b['tindakan'] ?? ''));
    $allowed  = ['KABURKAN','POTONGKAN','SENYAPKAN','PSA OVERLAY','SEMAK MANUAL','GANTIKAN'];
    if (!in_array($tindakan, $allowed, true)) Response::error('Tindakan tidak sah.');

    // Auto-assign bil
    $bil = (int)Db::val(
        "SELECT COALESCE(MAX(bil), 0) + 1 FROM ilpf_edits WHERE assignment_id = ?",
        [$assignmentId]
    );

    Db::q(
        "INSERT INTO ilpf_edits
         (assignment_id, bil, source, ts_mula, ts_tamat, tindakan, adegan, description, status, created_by)
         VALUES (?, ?, 'manual', ?, ?, ?, ?, ?, 'diterima', ?)",
        [
            $assignmentId, $bil,
            $b['ts_mula'] ?? null, $b['ts_tamat'] ?? null,
            $tindakan,
            $b['adegan'] ?? null,
            $b['description'] ?? null,
            $uid,
        ]
    );
    Response::ok(['id' => Db::lastId(), 'bil' => $bil]);
}

if ($method === 'PUT') {
    $b    = Response::body();
    $id   = (int)($_GET['id'] ?? 0);
    $edit = Db::row("SELECT * FROM ilpf_edits WHERE id = ? AND assignment_id = ?", [$id, $assignmentId]);
    if (!$edit) Response::error('Edit tidak dijumpai.', 404);

    $status = $b['status'] ?? $edit['status'];
    $validStatus = ['cadangan','diterima','ditolak'];
    if (!in_array($status, $validStatus, true)) Response::error('Status tidak sah.');

    Db::q(
        "UPDATE ilpf_edits SET status = ?, adegan = ?, description = ?, ts_mula = ?, ts_tamat = ?
         WHERE id = ?",
        [
            $status,
            $b['adegan'] ?? $edit['adegan'],
            $b['description'] ?? $edit['description'],
            $b['ts_mula'] ?? $edit['ts_mula'],
            $b['ts_tamat'] ?? $edit['ts_tamat'],
            $id,
        ]
    );
    Response::ok();
}

if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    $edit = Db::row(
        "SELECT id, source FROM ilpf_edits WHERE id = ? AND assignment_id = ?",
        [$id, $assignmentId]
    );
    if (!$edit) Response::error('Edit tidak dijumpai.', 404);
    if ($edit['source'] === 'ai') Response::error('Edit AI tidak boleh dipadam — gunakan status ditolak.', 403);
    Db::q("DELETE FROM ilpf_edits WHERE id = ?", [$id]);
    Response::ok();
}
