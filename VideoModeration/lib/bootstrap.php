<?php
declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->safeLoad();

date_default_timezone_set('Asia/Kuala_Lumpur');

function env(string $key, ?string $default = null): ?string {
    $val = $_ENV[$key] ?? getenv($key);
    return ($val === false || $val === null || $val === '') ? $default : $val;
}
