<?php
require_once __DIR__ . '/config.php';
Auth::require();
$page = htmlspecialchars($_GET['p'] ?? 'Halaman ini', ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="ms">
<head>
<meta charset="UTF-8">
<title><?= $page ?> · iLPF</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="ilpf.css">
<style>
  .stub-wrap { display:flex; align-items:center; justify-content:center; height:100vh; flex-direction:column; gap:12px; color:var(--ink); }
  .stub-wrap h1 { font-size:20px; font-weight:600; margin:0; }
  .stub-wrap p  { font-size:14px; color:var(--mute); margin:0; }
  .stub-wrap a  { font-size:13px; color:var(--pine); text-decoration:none; }
</style>
</head>
<body>
<div class="stub-wrap">
  <h1><?= $page ?></h1>
  <p>Modul ini belum tersedia.</p>
  <a href="Utama.php">← Kembali ke Utama</a>
</div>
</body>
</html>
