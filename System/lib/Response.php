<?php
declare(strict_types=1);

class Response
{
    public static function json(mixed $data, int $status = 200): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('X-Content-Type-Options: nosniff');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    public static function ok(mixed $data = null): void
    {
        self::json(['ok' => true, 'data' => $data]);
    }

    public static function error(string $msg, int $status = 400): void
    {
        self::json(['ok' => false, 'error' => $msg], $status);
    }

    public static function method(string ...$methods): void
    {
        if (!in_array($_SERVER['REQUEST_METHOD'], array_map('strtoupper', $methods), true)) {
            self::error('Kaedah tidak dibenarkan.', 405);
        }
    }

    public static function body(): array
    {
        $raw = file_get_contents('php://input');
        return json_decode($raw ?: '{}', true) ?? [];
    }

    public static function input(string $key, mixed $default = null): mixed
    {
        $body = self::body();
        return $body[$key] ?? $_POST[$key] ?? $_GET[$key] ?? $default;
    }
}
