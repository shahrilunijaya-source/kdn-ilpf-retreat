<?php
declare(strict_types=1);

namespace App;

use PDO;

class Db
{
    private static ?PDO $pdo = null;

    public static function pdo(): PDO
    {
        if (self::$pdo === null) {
            $host = env('DB_HOST', 'localhost');
            $name = env('DB_NAME');
            $user = env('DB_USER');
            $pass = env('DB_PASS');
            $dsn = "mysql:host={$host};dbname={$name};charset=utf8mb4";
            self::$pdo = new PDO($dsn, $user, $pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        }
        return self::$pdo;
    }
}
