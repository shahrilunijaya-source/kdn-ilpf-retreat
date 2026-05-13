<?php
require_once __DIR__ . '/../config.php';
Auth::requireApi();
Response::method('GET', 'PUT');

$method = $_SERVER['REQUEST_METHOD'];
$id     = (int)($_GET['id'] ?? 0);
$uid    = Auth::id();

if (!$id) Response::error('id diperlukan.');

$a = Db::row(
    "SELECT a.*, f.tajuk, f.no_permohonan, f.jenis, f.pengedar, f.tujuan,
            f.durasi_minit, f.video_path, f.kategori, f.tarikh_hantar
     FROM ilpf_assignments a JOIN ilpf_films f ON f.id = a.film_id
     WHERE a.id = ? AND a.user_id = ?",
    [$id, $uid]
);
if (!$a) Response::error('Tugasan tidak dijumpai.', 404);

if ($method === 'GET') {
    Response::ok($a);
}

if ($method === 'PUT') {
    $b      = Response::body();
    $status = $b['status'] ?? null;
    $valid  = ['menunggu','dalam_proses','selesai','lewat'];
    if ($status && !in_array($status, $valid, true)) Response::error('Status tidak sah.');

    if ($status) {
        Db::q("UPDATE ilpf_assignments SET status = ?, updated_at = NOW() WHERE id = ?", [$status, $id]);
    }
    Response::ok();
}
