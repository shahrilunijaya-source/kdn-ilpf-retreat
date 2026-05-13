<?php
declare(strict_types=1);

// Load .env for local dev
(function () {
    $f = __DIR__ . '/.env';
    if (!file_exists($f)) return;
    foreach (file($f, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if ($line[0] === '#') continue;
        [$k, $v] = explode('=', $line, 2) + [1 => ''];
        $_ENV[trim($k)] = trim($v);
    }
})();

// ─── Database ─────────────────────────────────────────────────────────────────
define('DB_HOST', $_ENV['DB_HOST'] ?? getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', $_ENV['DB_NAME'] ?? getenv('DB_NAME') ?: 'u958029070_ilpf');
define('DB_USER', $_ENV['DB_USER'] ?? getenv('DB_USER') ?: 'u958029070_ilpf');
define('DB_PASS', $_ENV['DB_PASS'] ?? getenv('DB_PASS') ?: '');

// ─── Session ──────────────────────────────────────────────────────────────────
define('SESSION_NAME',     'ilpf_sess');
define('SESSION_LIFETIME', 86400 * 30); // 30 days

// ─── App ──────────────────────────────────────────────────────────────────────
define('BASE_PATH', __DIR__);
define('APP_ENV',   $_ENV['APP_ENV'] ?? getenv('APP_ENV') ?: 'production');

date_default_timezone_set('Asia/Kuala_Lumpur');

require_once __DIR__ . '/lib/Db.php';
require_once __DIR__ . '/lib/Auth.php';
require_once __DIR__ . '/lib/Response.php';
require_once __DIR__ . '/lib/IlpfData.php';
