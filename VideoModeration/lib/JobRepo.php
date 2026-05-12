<?php
declare(strict_types=1);

namespace App;

use PDO;

class JobRepo
{
    public static function create(array $data): int
    {
        $sql = "INSERT INTO moderation_jobs
            (job_uuid, source_type, source_ref, mode, models, status)
            VALUES (:uuid, :stype, :sref, :mode, :models, :status)";
        $stmt = Db::pdo()->prepare($sql);
        $stmt->execute([
            ':uuid'   => $data['uuid'],
            ':stype'  => $data['source_type'],
            ':sref'   => $data['source_ref'],
            ':mode'   => $data['mode'],
            ':models' => $data['models'],
            ':status' => $data['status'] ?? 'pending',
        ]);
        return (int)Db::pdo()->lastInsertId();
    }

    public static function setMediaId(int $id, string $mediaId): void
    {
        $stmt = Db::pdo()->prepare(
            "UPDATE moderation_jobs SET sightengine_media_id=:m, status='processing' WHERE id=:id"
        );
        $stmt->execute([':m' => $mediaId, ':id' => $id]);
    }

    public static function complete(int $id, string $verdict, array $maxScores, array $raw): void
    {
        $stmt = Db::pdo()->prepare(
            "UPDATE moderation_jobs
             SET status='completed', verdict=:v, max_scores=:ms, raw_response=:raw
             WHERE id=:id"
        );
        $stmt->execute([
            ':v'   => $verdict,
            ':ms'  => json_encode($maxScores),
            ':raw' => json_encode($raw),
            ':id'  => $id,
        ]);
    }

    public static function fail(int $id, string $msg): void
    {
        $stmt = Db::pdo()->prepare(
            "UPDATE moderation_jobs SET status='failed', error_message=:m WHERE id=:id"
        );
        $stmt->execute([':m' => $msg, ':id' => $id]);
    }

    public static function findByMediaId(string $mediaId): ?array
    {
        $stmt = Db::pdo()->prepare(
            "SELECT * FROM moderation_jobs WHERE sightengine_media_id=:m LIMIT 1"
        );
        $stmt->execute([':m' => $mediaId]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public static function recent(int $limit = 50): array
    {
        $stmt = Db::pdo()->prepare(
            "SELECT id, job_uuid, source_type, source_ref, mode, status, verdict, created_at
             FROM moderation_jobs ORDER BY id DESC LIMIT :l"
        );
        $stmt->bindValue(':l', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public static function get(int $id): ?array
    {
        $stmt = Db::pdo()->prepare("SELECT * FROM moderation_jobs WHERE id=:id");
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public static function saveFrame(int $jobId, float $pos, array $scores, bool $flagged): void
    {
        $stmt = Db::pdo()->prepare(
            "INSERT INTO moderation_frames (job_id, frame_pos, scores, flagged)
             VALUES (:j, :p, :s, :f)"
        );
        $stmt->execute([
            ':j' => $jobId,
            ':p' => $pos,
            ':s' => json_encode($scores),
            ':f' => $flagged ? 1 : 0,
        ]);
    }
}
