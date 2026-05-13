<?php
// Shell layout — call shell_start() / shell_end() to wrap page content.
// Requires: $pageTitle (string), $activePage (string matching sidebar ids)

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/session.php';

function shell_start(string $pageTitle = 'iLPF', string $activePage = ''): void {
    global $_shell_activePage;
    $_shell_activePage = $activePage;
    requireLogin();
    $alpf = currentAlpf();
    ?>
<!DOCTYPE html>
<html lang="ms">
<head>
<meta charset="UTF-8">
<title><?= htmlspecialchars($pageTitle) ?> · iLPF</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/portal.css">
</head>
<body>

<!-- Topbar -->
<header class="tp">
  <div class="tp__brand">
    <img src="/assets/logo-mark.svg" alt="iLPF" class="tp__logo-img">
    <span class="tp__wordmark">iLPF</span>
  </div>
  <nav class="tp__nav">
    <a href="/utama.php" class="tp__link <?= $activePage === 'utama' ? 'tp__link--active' : '' ?>">Utama</a>
  </nav>
  <div class="tp__end">
    <span class="tp__alpf-name"><?= htmlspecialchars($alpf['name'] ?? '') ?></span>
    <a href="/profil.php" class="tp__avatar"><?= htmlspecialchars($alpf['initials'] ?? '?') ?></a>
    <a href="/logout.php" class="tp__logout">Keluar</a>
  </div>
</header>

<!-- App shell -->
<div class="app-shell">
  <!-- Sidebar -->
  <aside class="sidebar">
    <?php renderSidebar($activePage); ?>
  </aside>

  <!-- Main content -->
  <main class="main-content">
    <?php
}

function shell_end(): void {
    ?>
  </main>
</div>
</body>
</html>
    <?php
}

function renderSidebar(string $active): void {
    $items = [
        ['kind' => 'item', 'id' => 'utama', 'label' => 'Utama', 'href' => '/utama.php'],
        ['kind' => 'group', 'id' => 'permohonan', 'label' => 'Permohonan', 'children' => [
            ['kind' => 'item', 'id' => 'tapisan', 'label' => 'Tapisan', 'href' => '/tapisan-senarai.php'],
        ]],
        ['kind' => 'group', 'id' => 'cuti', 'label' => 'Cuti', 'children' => [
            ['kind' => 'item', 'id' => 'cuti-mohon', 'label' => 'Mohon Cuti', 'href' => '/cuti.php'],
        ]],
        ['kind' => 'group', 'id' => 'laporan', 'label' => 'Laporan', 'children' => [
            ['kind' => 'item', 'id' => 'lap-prestasi', 'label' => 'Laporan Prestasi ALPF', 'href' => '/laporan.php'],
        ]],
    ];
    renderSidebarItems($items, $active);
}

function renderSidebarItems(array $items, string $active): void {
    foreach ($items as $item) {
        if ($item['kind'] === 'item') {
            $cls = $item['id'] === $active ? 'sb-item sb-item--active' : 'sb-item';
            echo '<a href="' . htmlspecialchars($item['href']) . '" class="' . $cls . '">' . htmlspecialchars($item['label']) . '</a>';
        } elseif ($item['kind'] === 'group') {
            echo '<div class="sb-group">';
            echo '<div class="sb-group__label">' . htmlspecialchars($item['label']) . '</div>';
            if (!empty($item['children'])) {
                renderSidebarItems($item['children'], $active);
            }
            echo '</div>';
        }
    }
}
