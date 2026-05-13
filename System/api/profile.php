<?php
require_once __DIR__ . '/../config.php';
Auth::requireApi();
Response::method('GET', 'PUT');

$uid = Auth::id();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user = Auth::user();
    Response::ok($user);
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $b = Response::body();

    // Password change
    if (isset($b['password_current'])) {
        $user = Db::row("SELECT password_hash FROM ilpf_users WHERE id = ?", [$uid]);
        if (!password_verify($b['password_current'], $user['password_hash'])) {
            Response::error('Kata laluan semasa tidak betul.');
        }
        if (strlen($b['password_new'] ?? '') < 8) {
            Response::error('Kata laluan baharu mestilah sekurang-kurangnya 8 aksara.');
        }
        $hash = password_hash($b['password_new'], PASSWORD_BCRYPT, ['cost' => 12]);
        Db::q("UPDATE ilpf_users SET password_hash = ? WHERE id = ?", [$hash, $uid]);
        Response::ok(['message' => 'Kata laluan berjaya dikemaskini.']);
    }

    // General profile update (limited fields)
    $allowed = ['tel', 'tel_bimbit', 'alamat', 'negeri', 'daerah', 'poskod', 'bahasa'];
    $updates = [];
    $params  = [];
    foreach ($allowed as $field) {
        if (array_key_exists($field, $b)) {
            $updates[] = "$field = ?";
            $params[]  = $b[$field];
        }
    }
    if ($updates) {
        $params[] = $uid;
        Db::q("UPDATE ilpf_users SET " . implode(', ', $updates) . " WHERE id = ?", $params);
    }
    Response::ok();
}
