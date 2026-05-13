<?php
require_once __DIR__ . '/../config.php';
Auth::requireApi();
Response::method('GET', 'POST', 'DELETE');

$method       = $_SERVER['REQUEST_METHOD'];
$assignmentId = (int)($_GET['assignment_id'] ?? 0);
$uid          = Auth::id();

if (!$assignmentId) Response::error('assignment_id diperlukan.');

// Only ketua of this assignment can manage panel
$assignment = Db::row(
    "SELECT id, role FROM ilpf_assignments WHERE id = ? AND user_id = ?",
    [$assignmentId, $uid]
);
if (!$assignment) Response::error('Tugasan tidak dijumpai.', 404);
if ($assignment['role'] !== 'ketua') Response::error('Hanya Ketua Panel boleh mengurus ahli panel.', 403);

if ($method === 'GET') {
    $members = Db::rows(
        "SELECT p.id, p.role, u.name, u.initials, u.alpf_id, u.expertise,
                (SELECT COUNT(*) FROM ilpf_assignments WHERE user_id = u.id AND status IN ('menunggu','dalam_proses')) as beban
         FROM ilpf_panels p JOIN ilpf_users u ON u.id = p.user_id
         WHERE p.assignment_id = ?",
        [$assignmentId]
    );
    Response::ok($members);
}

if ($method === 'POST') {
    $b      = Response::body();
    $userId = (int)($b['user_id'] ?? 0);
    $role   = $b['role'] ?? 'ahli';
    if (!in_array($role, ['ketua','ahli'], true)) Response::error('Role tidak sah.');
    $exists = Db::val(
        "SELECT id FROM ilpf_users WHERE id = ? AND role IN ('ahli','ketua')", [$userId]
    );
    if (!$exists) Response::error('ALPF tidak dijumpai.');
    $already = Db::val(
        "SELECT id FROM ilpf_panels WHERE assignment_id = ? AND user_id = ?",
        [$assignmentId, $userId]
    );
    if ($already) Response::error('ALPF sudah dalam panel ini.');
    Db::q(
        "INSERT INTO ilpf_panels (assignment_id, user_id, role) VALUES (?, ?, ?)",
        [$assignmentId, $userId, $role]
    );
    Response::ok(['id' => Db::lastId()]);
}

if ($method === 'DELETE') {
    $panelId = (int)($_GET['id'] ?? 0);
    $member  = Db::row(
        "SELECT id, user_id FROM ilpf_panels WHERE id = ? AND assignment_id = ?",
        [$panelId, $assignmentId]
    );
    if (!$member) Response::error('Ahli panel tidak dijumpai.', 404);
    if ($member['user_id'] == $uid) Response::error('Ketua Panel tidak boleh memadam diri sendiri.', 403);
    Db::q("DELETE FROM ilpf_panels WHERE id = ?", [$panelId]);
    Response::ok();
}
