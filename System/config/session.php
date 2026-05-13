<?php
declare(strict_types=1);

function requireLogin(): void {
    if (session_status() === PHP_SESSION_NONE) session_start();
    if (empty($_SESSION['alpf_id'])) {
        header('Location: /login.php');
        exit;
    }
}

function currentAlpf(): array {
    return $_SESSION['alpf'] ?? [];
}
