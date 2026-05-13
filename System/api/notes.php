<?php
require_once __DIR__ . '/../config.php';
Auth::requireApi();
Response::method('GET', 'POST', 'DELETE');

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
    $rows = Db::rows(
        "SELECT id, ts_ref, content, created_at FROM ilpf_notes
         WHERE assignment_id = ? AND user_id = ? ORDER BY created_at ASC",
        [$assignmentId, $uid]
    );
    Response::ok($rows);
}

if ($method === 'POST') {
    $b       = Response::body();
    $content = trim($b['content'] ?? '');
    if (!$content) Response::error('Nota tidak boleh kosong.');
    Db::q(
        "INSERT INTO ilpf_notes (assignment_id, user_id, ts_ref, content) VALUES (?, ?, ?, ?)",
        [$assignmentId, $uid, $b['ts_ref'] ?? null, $content]
    );
    Response::ok(['id' => Db::lastId()]);
}

if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    $n  = Db::row(
        "SELECT id FROM ilpf_notes WHERE id = ? AND assignment_id = ? AND user_id = ?",
        [$id, $assignmentId, $uid]
    );
    if (!$n) Response::error('Nota tidak dijumpai.', 404);
    Db::q("DELETE FROM ilpf_notes WHERE id = ?", [$id]);
    Response::ok();
}
