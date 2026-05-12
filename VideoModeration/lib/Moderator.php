<?php
declare(strict_types=1);

namespace App;

use Sightengine\SightengineClient;
use PDO;

class Moderator
{
    private SightengineClient $client;
    private string $models;
    private array $thresholds;

    public function __construct()
    {
        $this->client = new SightengineClient(
            env('SIGHTENGINE_USER'),
            env('SIGHTENGINE_SECRET')
        );
        $this->models = env('SIGHTENGINE_MODELS', 'nudity-2.1,weapon,gore-2.0,violence,offensive-2.0');
        $this->thresholds = [
            'nudity.sexual_activity'  => 0.5,
            'nudity.sexual_display'   => 0.5,
            'nudity.erotica'          => 0.6,
            'weapon.classes.firearm'  => 0.5,
            'weapon.classes.knife'    => 0.5,
            'gore.prob'               => 0.5,
            'violence.prob'           => 0.6,
            'offensive.nazi'          => 0.5,
            'offensive.middle_finger' => 0.6,
        ];
    }

    public function modelList(): string
    {
        return $this->models;
    }

    public function checkSync(string $url): array
    {
        $models = explode(',', $this->models);
        $resp = $this->client->check($models)->video_sync($url);
        return json_decode(json_encode($resp), true);
    }

    public function submitAsync(string $url, string $callbackUrl): array
    {
        $models = explode(',', $this->models);
        $resp = $this->client->check($models)
            ->video($url, $callbackUrl);
        return json_decode(json_encode($resp), true);
    }

    public function evaluateFrames(array $response): array
    {
        $frames = $response['data']['frames'] ?? [];
        $maxScores = [];
        $flaggedFrames = [];

        foreach ($frames as $frame) {
            $pos = (float)($frame['info']['position'] ?? 0);
            $framFlagged = false;

            foreach ($this->thresholds as $path => $threshold) {
                $score = $this->dig($frame, explode('.', $path));
                if ($score === null) continue;
                $maxScores[$path] = max($maxScores[$path] ?? 0, $score);
                if ($score >= $threshold) $framFlagged = true;
            }

            if ($framFlagged) {
                $flaggedFrames[] = ['position' => $pos, 'frame' => $frame];
            }
        }

        $verdict = 'clean';
        foreach ($this->thresholds as $path => $threshold) {
            if (($maxScores[$path] ?? 0) >= $threshold) {
                $verdict = 'flagged';
                break;
            }
        }

        return [
            'verdict'        => $verdict,
            'max_scores'     => $maxScores,
            'flagged_frames' => $flaggedFrames,
            'frame_count'    => count($frames),
        ];
    }

    private function dig(array $node, array $path)
    {
        foreach ($path as $key) {
            if (!is_array($node) || !array_key_exists($key, $node)) return null;
            $node = $node[$key];
        }
        return is_numeric($node) ? (float)$node : null;
    }
}
