<?php
require_once __DIR__ . '/../lib/bootstrap.php';
use App\JobRepo;

$id  = (int)($_GET['id'] ?? 0);
$job = JobRepo::get($id);
if (!$job) { http_response_code(404); exit('Not found.'); }

$maxScores   = json_decode($job['max_scores'] ?? '{}', true) ?: [];
$rawResponse = json_decode($job['raw_response'] ?? '{}', true) ?: [];
$frames      = $rawResponse['data']['frames'] ?? [];

$verdict = $job['verdict'];
$status  = $job['status'];

$verdictConfig = [
    'flagged' => ['label' => 'FLAGGED',  'color' => '#c0392b', 'bg' => '#fdf0ef', 'icon' => '&#9888;'],
    'clean'   => ['label' => 'CLEAN',    'color' => '#27ae60', 'bg' => '#edfaf3', 'icon' => '&#10003;'],
    'review'  => ['label' => 'REVIEW',   'color' => '#d68910', 'bg' => '#fef9ed', 'icon' => '&#9679;'],
    'unknown' => ['label' => 'UNKNOWN',  'color' => '#7f8c8d', 'bg' => '#f4f6f7', 'icon' => '&#63;'],
];
$vc = $verdictConfig[$verdict] ?? $verdictConfig['unknown'];

$categoryLabels = [
    'gore.prob'                    => 'Gore / Graphic Violence',
    'violence.prob'                => 'Violence',
    'weapon.classes.firearm'       => 'Firearm',
    'weapon.classes.knife'         => 'Knife / Blade',
    'nudity.sexual_activity'       => 'Sexual Activity',
    'nudity.sexual_display'        => 'Sexual Display',
    'nudity.erotica'               => 'Erotica',
    'offensive.nazi'               => 'Nazi / Extremist',
    'offensive.middle_finger'      => 'Offensive Gesture',
];

$thresholds = [
    'gore.prob'                    => 0.5,
    'violence.prob'                => 0.6,
    'weapon.classes.firearm'       => 0.5,
    'weapon.classes.knife'         => 0.5,
    'nudity.sexual_activity'       => 0.5,
    'nudity.sexual_display'        => 0.5,
    'nudity.erotica'               => 0.6,
    'offensive.nazi'               => 0.5,
    'offensive.middle_finger'      => 0.6,
];

function scoreColor(float $s, float $threshold): string {
    if ($s >= $threshold) return '#c0392b';
    if ($s >= $threshold * 0.6) return '#d68910';
    return '#27ae60';
}

function formatTime(int $ms): string {
    $s = intdiv($ms, 1000);
    return sprintf('%d:%02d', intdiv($s, 60), $s % 60);
}

// Collect flagged frames with top reasons
$flaggedFrames = [];
foreach ($frames as $frame) {
    $pos     = (int)($frame['info']['position'] ?? 0);
    $reasons = [];
    foreach ($thresholds as $path => $thr) {
        $parts = explode('.', $path);
        $val   = $frame;
        foreach ($parts as $p) {
            if (!is_array($val) || !isset($val[$p])) { $val = null; break; }
            $val = $val[$p];
        }
        if (is_numeric($val) && (float)$val >= $thr) {
            $reasons[] = ['label' => $categoryLabels[$path] ?? $path, 'score' => (float)$val];
        }
    }
    if ($reasons) {
        usort($reasons, fn($a, $b) => $b['score'] <=> $a['score']);
        $flaggedFrames[] = ['pos' => $pos, 'reasons' => $reasons];
    }
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Moderation Result #<?= $id ?></title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f0f2f5; color: #1a1a2e; }
.wrap { max-width: 860px; margin: 0 auto; padding: 2rem 1rem; }
.back { display: inline-block; margin-bottom: 1.5rem; color: #555; text-decoration: none; font-size: 0.9rem; }
.back:hover { color: #000; }

/* Verdict Banner */
.banner { border-radius: 12px; padding: 1.8rem 2rem; margin-bottom: 2rem; display: flex; align-items: center; gap: 1.5rem; }
.banner-icon { font-size: 3rem; line-height: 1; }
.banner-title { font-size: 2rem; font-weight: 800; letter-spacing: 1px; }
.banner-sub { font-size: 0.95rem; color: #555; margin-top: 0.3rem; }
.badge { display: inline-block; padding: 0.2rem 0.7rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; }
.badge-completed { background: #dff5e3; color: #1e7e34; }
.badge-failed { background: #fde8e8; color: #c0392b; }
.badge-pending { background: #fff3cd; color: #856404; }
.badge-processing { background: #d1ecf1; color: #0c5460; }

/* Cards */
.card { background: #fff; border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
.card h2 { font-size: 1rem; font-weight: 700; color: #333; margin-bottom: 1.2rem; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #f0f2f5; padding-bottom: 0.7rem; }

/* Meta info */
.meta-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
.meta-item label { font-size: 0.75rem; color: #888; text-transform: uppercase; font-weight: 600; }
.meta-item p { font-size: 0.95rem; color: #222; margin-top: 0.2rem; word-break: break-all; }

/* Score bars */
.score-row { margin-bottom: 1rem; }
.score-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; }
.score-label { font-size: 0.9rem; color: #333; font-weight: 500; }
.score-value { font-size: 0.9rem; font-weight: 700; }
.score-bar-bg { background: #eee; border-radius: 999px; height: 10px; overflow: hidden; }
.score-bar-fill { height: 100%; border-radius: 999px; transition: width 0.4s ease; }
.score-flag { font-size: 0.75rem; color: #c0392b; font-weight: 700; margin-left: 0.5rem; }

/* Flagged frames */
.frames-list { display: flex; flex-direction: column; gap: 0.75rem; }
.frame-item { background: #fff8f8; border: 1px solid #f5c6cb; border-radius: 8px; padding: 0.8rem 1.1rem; display: flex; align-items: flex-start; gap: 1rem; }
.frame-time { font-size: 1rem; font-weight: 800; color: #c0392b; min-width: 50px; }
.frame-reasons { flex: 1; }
.frame-tag { display: inline-block; background: #fde8e8; color: #c0392b; font-size: 0.8rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 5px; margin: 0.15rem 0.2rem 0.15rem 0; }
.no-flags { color: #27ae60; font-size: 0.95rem; }

/* Error */
.error-box { background: #fde8e8; border-left: 4px solid #c0392b; padding: 1rem 1.2rem; border-radius: 6px; font-size: 0.9rem; color: #c0392b; word-break: break-word; }

/* Raw toggle */
details { margin-top: 0; }
summary { cursor: pointer; font-size: 0.85rem; color: #888; padding: 0.5rem 0; user-select: none; }
summary:hover { color: #333; }
pre.raw { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 6px; padding: 1rem; font-size: 0.75rem; overflow-x: auto; margin-top: 0.5rem; max-height: 400px; overflow-y: auto; }
</style>
</head>
<body>
<div class="wrap">
  <a class="back" href="index.php">&#8592; Back to all jobs</a>

  <!-- Verdict Banner -->
  <div class="banner" style="background:<?= $vc['bg'] ?>; border: 2px solid <?= $vc['color'] ?>20;">
    <div class="banner-icon" style="color:<?= $vc['color'] ?>"><?= $vc['icon'] ?></div>
    <div>
      <div class="banner-title" style="color:<?= $vc['color'] ?>"><?= $vc['label'] ?></div>
      <div class="banner-sub">
        Job #<?= $id ?> &nbsp;&bull;&nbsp;
        <span class="badge badge-<?= $status ?>"><?= strtoupper($status) ?></span>
        &nbsp;&bull;&nbsp; <?= $job['mode'] === 'sync' ? 'Synchronous check' : 'Asynchronous check' ?>
      </div>
    </div>
  </div>

  <?php if ($job['error_message']): ?>
  <div class="card">
    <h2>Error</h2>
    <div class="error-box"><?= htmlspecialchars($job['error_message']) ?></div>
  </div>
  <?php endif; ?>

  <!-- Meta -->
  <div class="card">
    <h2>Details</h2>
    <div class="meta-grid">
      <div class="meta-item">
        <label>Source type</label>
        <p><?= ucfirst($job['source_type']) ?></p>
      </div>
      <div class="meta-item">
        <label>File / URL</label>
        <p><?= htmlspecialchars($job['source_ref']) ?></p>
      </div>
      <div class="meta-item">
        <label>Frames checked</label>
        <p><?= count($frames) ?> frames</p>
      </div>
      <div class="meta-item">
        <label>Submitted</label>
        <p><?= $job['created_at'] ?></p>
      </div>
    </div>
  </div>

  <!-- Score Breakdown -->
  <?php if (!empty($maxScores)): ?>
  <div class="card">
    <h2>Content Category Scores</h2>
    <?php foreach ($categoryLabels as $path => $label):
      $score = $maxScores[$path] ?? 0;
      $thr   = $thresholds[$path] ?? 0.5;
      $col   = scoreColor($score, $thr);
      $pct   = min(100, round($score * 100));
    ?>
    <div class="score-row">
      <div class="score-header">
        <span class="score-label"><?= $label ?></span>
        <span class="score-value" style="color:<?= $col ?>">
          <?= $pct ?>%
          <?php if ($score >= $thr): ?><span class="score-flag">&#9650; FLAGGED</span><?php endif; ?>
        </span>
      </div>
      <div class="score-bar-bg">
        <div class="score-bar-fill" style="width:<?= $pct ?>%; background:<?= $col ?>"></div>
      </div>
    </div>
    <?php endforeach; ?>
  </div>
  <?php endif; ?>

  <!-- Flagged Frames Timeline -->
  <div class="card">
    <h2>Flagged Moments</h2>
    <?php if (empty($flaggedFrames)): ?>
      <p class="no-flags">&#10003; No flagged moments detected.</p>
    <?php else: ?>
      <p style="font-size:0.85rem; color:#888; margin-bottom:1rem"><?= count($flaggedFrames) ?> moment(s) flagged out of <?= count($frames) ?> frames checked.</p>
      <div class="frames-list">
        <?php foreach ($flaggedFrames as $ff): ?>
        <div class="frame-item">
          <div class="frame-time"><?= formatTime($ff['pos']) ?></div>
          <div class="frame-reasons">
            <?php foreach ($ff['reasons'] as $r): ?>
              <span class="frame-tag"><?= htmlspecialchars($r['label']) ?> &mdash; <?= round($r['score'] * 100) ?>%</span>
            <?php endforeach; ?>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>

  <!-- Raw JSON (collapsed) -->
  <div class="card">
    <details>
      <summary>Show raw API response (technical)</summary>
      <pre class="raw"><?= htmlspecialchars(json_encode($rawResponse, JSON_PRETTY_PRINT)) ?></pre>
    </details>
  </div>

</div>
</body>
</html>
