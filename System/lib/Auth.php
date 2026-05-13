<?php
declare(strict_types=1);

class Auth
{
    private static ?array $user = null;

    public static function start(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_name(SESSION_NAME);
            session_set_cookie_params([
                'lifetime' => SESSION_LIFETIME,
                'path'     => '/',
                'secure'   => isset($_SERVER['HTTPS']),
                'httponly' => true,
                'samesite' => 'Lax',
            ]);
            session_start();
        }
    }

    public static function check(): bool
    {
        self::start();
        if (empty($_SESSION['user_id']) || empty($_SESSION['session_token'])) {
            return false;
        }
        $hash = hash('sha256', $_SESSION['session_token']);
        $sess = Db::row(
            "SELECT id FROM ilpf_sessions
             WHERE token_hash = ? AND user_id = ? AND expires_at > NOW() LIMIT 1",
            [$hash, $_SESSION['user_id']]
        );
        if (!$sess) {
            self::clear();
            return false;
        }
        Db::q("UPDATE ilpf_sessions SET last_at = NOW() WHERE token_hash = ?", [$hash]);
        return true;
    }

    public static function require(): void
    {
        if (!self::check()) {
            header('Location: login.php');
            exit;
        }
    }

    public static function requireApi(): void
    {
        if (!self::check()) {
            Response::error('Sesi tamat. Sila log masuk semula.', 401);
        }
    }

    public static function user(): ?array
    {
        if (!isset($_SESSION['user_id'])) return null;
        if (self::$user === null) {
            self::$user = Db::row(
                "SELECT id, alpf_id, name, email, role, initials, avatar_url,
                        expertise, bahasa, no_kp, umur, jantina, tarikh_lahir, tempat_lahir,
                        bangsa, agama, warna_kp, alamat, negeri, daerah, poskod,
                        tel, tel_bimbit, taraf_kahwin,
                        pelantikan, tamat, penggal,
                        aku_janji_signed_at, aku_janji_version
                 FROM ilpf_users WHERE id = ?",
                [$_SESSION['user_id']]
            );
        }
        return self::$user;
    }

    public static function id(): int
    {
        return (int)($_SESSION['user_id'] ?? 0);
    }

    public static function login(string $email, string $password): bool
    {
        self::start();
        $u = Db::row(
            "SELECT id, name, alpf_id, role, password_hash FROM ilpf_users WHERE email = ? LIMIT 1",
            [strtolower(trim($email))]
        );
        if (!$u || !password_verify($password, $u['password_hash'])) {
            return false;
        }
        $token = bin2hex(random_bytes(32));
        $hash  = hash('sha256', $token);
        $device = self::detectDevice($_SERVER['HTTP_USER_AGENT'] ?? '');
        $ip     = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        Db::q(
            "INSERT INTO ilpf_sessions (user_id, token_hash, device, ip, expires_at)
             VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 30 DAY))",
            [$u['id'], $hash, $device, $ip]
        );
        session_regenerate_id(true);
        $_SESSION['user_id']       = $u['id'];
        $_SESSION['alpf_id']       = $u['alpf_id'];
        $_SESSION['name']          = $u['name'];
        $_SESSION['role']          = $u['role'];
        $_SESSION['session_token'] = $token;
        return true;
    }

    public static function logout(): void
    {
        self::start();
        if (!empty($_SESSION['session_token'])) {
            $hash = hash('sha256', $_SESSION['session_token']);
            Db::q("DELETE FROM ilpf_sessions WHERE token_hash = ?", [$hash]);
        }
        self::clear();
    }

    private static function clear(): void
    {
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $p = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $p['path'], $p['domain'], $p['secure'], $p['httponly']);
        }
        session_destroy();
    }

    private static function detectDevice(string $ua): string
    {
        if (str_contains($ua, 'iPhone'))   return 'iPhone · Mobile Safari';
        if (str_contains($ua, 'iPad'))     return 'iPad · Mobile Safari';
        if (str_contains($ua, 'Android'))  return 'Android · Chrome';
        if (str_contains($ua, 'Chrome'))   return 'Windows · Chrome';
        if (str_contains($ua, 'Safari'))   return 'macOS · Safari';
        if (str_contains($ua, 'Firefox'))  return 'Firefox';
        return 'Browser';
    }
}
