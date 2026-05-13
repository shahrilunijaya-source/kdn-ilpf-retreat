<?php
require_once __DIR__ . '/../config.php';
Auth::requireApi();
Response::method('POST');

$uid = Auth::id();

Db::q(
    "UPDATE ilpf_users SET aku_janji_signed_at = NOW(), aku_janji_version = '2025' WHERE id = ?",
    [$uid]
);

Response::ok(['signed_at' => date('Y-m-d H:i:s')]);
