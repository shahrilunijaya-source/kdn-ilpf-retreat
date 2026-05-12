<?php
require_once __DIR__ . '/../lib/bootstrap.php';
use App\JobRepo;
use App\Moderator;

$token = $_GET['token'] ?? '';
if (!hash_equals(env('CALLBACK_TOKEN', ''), $token)) {
    http_response_code(403);
    exit('Forbidden.');
}

$body = file_get_contents('php://input');
@file_put_contents(__DIR__ . '/../callback.log', date('c') . ' ' . $body . PHP_EOL, FILE_APPEND);

$payload = json_decode($body, true);
if (!is_array($payload)) {
    http_response_code(400);
    exit('Bad payload.');
}

$mediaId = $payload['media']['id'] ?? null;
if (!$mediaId) {
    http_response_code(400);
    exit('No media id.');
}

$job = JobRepo::findByMediaId($mediaId);
if (!$job) {
    http_response_code(404);
    exit('Job not found.');
}

$mod = new Moderator();
$eval = $mod->evaluateFrames($payload);

foreach ($eval['flagged_frames'] as $ff) {
    JobRepo::saveFrame((int)$job['id'], $ff['position'], $ff['frame'], true);
}
JobRepo::complete((int)$job['id'], $eval['verdict'], $eval['max_scores'], $payload);

http_response_code(200);
echo 'OK';
