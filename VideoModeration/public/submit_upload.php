<?php
require_once __DIR__ . '/../lib/bootstrap.php';
use App\JobRepo;
use App\Moderator;

if (empty($_FILES['video']['tmp_name']) || $_FILES['video']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    exit('Upload failed.');
}

$uploadsDir = __DIR__ . '/../uploads';
if (!is_dir($uploadsDir)) mkdir($uploadsDir, 0755, true);

$origName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $_FILES['video']['name']);
$stored = $uploadsDir . '/' . bin2hex(random_bytes(8)) . '_' . $origName;
move_uploaded_file($_FILES['video']['tmp_name'], $stored);

$mod = new Moderator();
$jobId = JobRepo::create([
    'uuid'        => bin2hex(random_bytes(16)),
    'source_type' => 'upload',
    'source_ref'  => basename($stored),
    'mode'        => 'sync',
    'models'      => $mod->modelList(),
    'status'      => 'pending',
]);

try {
    $endpoint = 'https://api.sightengine.com/1.0/video/check-sync.json';
    $post = [
        'media'      => new CURLFile($stored),
        'models'     => $mod->modelList(),
        'api_user'   => env('SIGHTENGINE_USER'),
        'api_secret' => env('SIGHTENGINE_SECRET'),
    ];
    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $post,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 300,
    ]);
    $body = curl_exec($ch);
    if ($body === false) {
        throw new RuntimeException('cURL: ' . curl_error($ch));
    }
    curl_close($ch);

    $raw = json_decode($body, true);
    if (!is_array($raw)) throw new RuntimeException('Bad JSON: ' . $body);
    if (($raw['status'] ?? '') === 'failure') {
        throw new RuntimeException('Sightengine: ' . ($raw['error']['message'] ?? 'unknown'));
    }

    $eval = $mod->evaluateFrames($raw);
    foreach ($eval['flagged_frames'] as $ff) {
        JobRepo::saveFrame($jobId, $ff['position'], $ff['frame'], true);
    }
    JobRepo::complete($jobId, $eval['verdict'], $eval['max_scores'], $raw);
} catch (\Throwable $e) {
    JobRepo::fail($jobId, $e->getMessage());
}

header('Location: job.php?id=' . $jobId);
