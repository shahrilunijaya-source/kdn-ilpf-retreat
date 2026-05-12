<?php
require_once __DIR__ . '/../lib/bootstrap.php';
use App\JobRepo;
use App\Moderator;

$url = $_POST['video_url'] ?? '';
$mode = $_POST['mode'] ?? 'sync';

if (!filter_var($url, FILTER_VALIDATE_URL)) {
    http_response_code(400);
    exit('Invalid URL.');
}

$mod = new Moderator();
$jobId = JobRepo::create([
    'uuid'        => bin2hex(random_bytes(16)),
    'source_type' => 'url',
    'source_ref'  => $url,
    'mode'        => $mode,
    'models'      => $mod->modelList(),
    'status'      => 'pending',
]);

try {
    if ($mode === 'sync') {
        $raw = $mod->checkSync($url);
        $eval = $mod->evaluateFrames($raw);

        foreach ($eval['flagged_frames'] as $ff) {
            JobRepo::saveFrame($jobId, $ff['position'], $ff['frame'], true);
        }
        JobRepo::complete($jobId, $eval['verdict'], $eval['max_scores'], $raw);
    } else {
        $token = env('CALLBACK_TOKEN');
        $base  = rtrim(env('APP_BASE_URL'), '/');
        $cb    = "{$base}/callback.php?token={$token}";
        $resp  = $mod->submitAsync($url, $cb);
        $mediaId = $resp['media']['id'] ?? null;
        if (!$mediaId) {
            throw new RuntimeException('No media id returned: ' . json_encode($resp));
        }
        JobRepo::setMediaId($jobId, $mediaId);
    }
} catch (\Throwable $e) {
    JobRepo::fail($jobId, $e->getMessage());
}

header('Location: job.php?id=' . $jobId);
