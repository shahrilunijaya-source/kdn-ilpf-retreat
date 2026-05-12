<?php
require_once __DIR__ . '/../lib/bootstrap.php';
use App\JobRepo;

$jobs = JobRepo::recent(20);

$stats = ['total' => 0, 'flagged' => 0, 'clean' => 0, 'failed' => 0];
foreach ($jobs as $j) {
    $stats['total']++;
    if ($j['status'] === 'failed') $stats['failed']++;
    elseif ($j['verdict'] === 'flagged') $stats['flagged']++;
    elseif ($j['verdict'] === 'clean') $stats['clean']++;
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>KDN-iLPF — Video Content Moderation</title>
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg:       #f8fafc;
  --surface:  #ffffff;
  --border:   #e2e8f0;
  --border-2: #cbd5e1;
  --text-1:   #0f172a;
  --text-2:   #475569;
  --text-3:   #94a3b8;
  --blue:     #2563eb;
  --blue-lt:  #eff6ff;
  --red:      #dc2626;
  --red-lt:   #fef2f2;
  --green:    #16a34a;
  --green-lt: #f0fdf4;
  --amber:    #d97706;
  --amber-lt: #fffbeb;
  --radius:   10px;
  --shadow:   0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);
  --shadow-md:0 4px 12px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04);
}
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif; background: var(--bg); color: var(--text-1); font-size: 15px; line-height: 1.6; }

/* ── Header ── */
.header { background: var(--surface); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
.header-inner { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; display: flex; align-items: center; gap: 1rem; height: 64px; }
.header-logo { display: flex; align-items: center; gap: 0.75rem; }
.logo-badge { width: 38px; height: 38px; background: linear-gradient(135deg, #1e3a8a, #2563eb); border-radius: 9px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 0.85rem; letter-spacing: -0.5px; flex-shrink: 0; }
.header-titles { display: flex; flex-direction: column; }
.header-title { font-size: 0.95rem; font-weight: 700; color: var(--text-1); line-height: 1.2; }
.header-sub { font-size: 0.72rem; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.5px; }
.header-divider { width: 1px; height: 28px; background: var(--border); margin: 0 0.5rem; }
.header-label { font-size: 0.8rem; color: var(--text-3); font-weight: 500; }
.header-spacer { flex: 1; }
.header-tag { font-size: 0.72rem; font-weight: 600; padding: 0.25rem 0.65rem; background: var(--blue-lt); color: var(--blue); border-radius: 999px; border: 1px solid #bfdbfe; }

/* ── Layout ── */
.page { max-width: 1100px; margin: 0 auto; padding: 2rem 1.5rem; }
.section-title { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--text-3); margin-bottom: 1rem; }

/* ── Stats row ── */
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem; }
.stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.1rem 1.25rem; box-shadow: var(--shadow); }
.stat-label { font-size: 0.75rem; color: var(--text-3); font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; }
.stat-value { font-size: 2rem; font-weight: 800; line-height: 1.1; margin-top: 0.3rem; }
.stat-card.total  .stat-value { color: var(--text-1); }
.stat-card.flagged .stat-value { color: var(--red); }
.stat-card.clean   .stat-value { color: var(--green); }
.stat-card.failed  .stat-value { color: var(--text-3); }

/* ── Two-col layout ── */
.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }

/* ── Card ── */
.card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; }
.card-header { padding: 1.1rem 1.25rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 0.6rem; }
.card-icon { width: 30px; height: 30px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
.card-icon.blue { background: var(--blue-lt); }
.card-icon.green { background: var(--green-lt); }
.card-title { font-size: 0.9rem; font-weight: 700; color: var(--text-1); }
.card-desc { font-size: 0.78rem; color: var(--text-3); margin-top: 0.1rem; }
.card-body { padding: 1.25rem; }

/* ── Form elements ── */
.field { margin-bottom: 1rem; }
.field label { display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-2); margin-bottom: 0.4rem; }
.field input[type=url],
.field input[type=file],
.field select { width: 100%; padding: 0.6rem 0.85rem; border: 1px solid var(--border-2); border-radius: 7px; font-size: 0.9rem; color: var(--text-1); background: #fff; outline: none; transition: border-color .15s, box-shadow .15s; }
.field input[type=url]:focus,
.field select:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
.field input[type=file] { padding: 0.45rem 0.85rem; cursor: pointer; color: var(--text-2); }
.field .hint { font-size: 0.75rem; color: var(--text-3); margin-top: 0.3rem; }

.btn { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.6rem 1.2rem; border-radius: 7px; font-size: 0.88rem; font-weight: 600; border: none; cursor: pointer; transition: all .15s; text-decoration: none; }
.btn-primary { background: var(--blue); color: #fff; }
.btn-primary:hover { background: #1d4ed8; box-shadow: 0 2px 8px rgba(37,99,235,.35); }
.btn-outline { background: #fff; color: var(--text-1); border: 1px solid var(--border-2); }
.btn-outline:hover { background: var(--bg); border-color: #94a3b8; }
.btn-full { width: 100%; justify-content: center; margin-top: 0.25rem; }

/* ── Table ── */
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
thead th { padding: 0.7rem 1rem; text-align: left; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-3); border-bottom: 1px solid var(--border); white-space: nowrap; }
tbody tr { border-bottom: 1px solid var(--border); transition: background .1s; }
tbody tr:last-child { border-bottom: none; }
tbody tr:hover { background: var(--bg); }
tbody td { padding: 0.75rem 1rem; vertical-align: middle; color: var(--text-2); }
tbody td.source { max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.8rem; color: var(--text-3); }
.verdict-pill { display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.2rem 0.65rem; border-radius: 999px; font-size: 0.78rem; font-weight: 700; }
.verdict-pill.flagged { background: var(--red-lt); color: var(--red); }
.verdict-pill.clean { background: var(--green-lt); color: var(--green); }
.verdict-pill.unknown { background: var(--bg); color: var(--text-3); border: 1px solid var(--border); }
.status-dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
.status-dot.completed { background: var(--green); }
.status-dot.failed { background: var(--red); }
.status-dot.pending, .status-dot.processing { background: var(--amber); }
.view-link { font-size: 0.8rem; font-weight: 600; color: var(--blue); text-decoration: none; padding: 0.25rem 0.6rem; border-radius: 5px; border: 1px solid transparent; }
.view-link:hover { background: var(--blue-lt); border-color: #bfdbfe; }

/* ── Mode toggle ── */
.mode-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.mode-tab { padding: 0.4rem 0.85rem; border-radius: 6px; font-size: 0.82rem; font-weight: 600; border: 1px solid var(--border-2); background: #fff; color: var(--text-2); cursor: pointer; }
.mode-tab.active { background: var(--blue); color: #fff; border-color: var(--blue); }

/* ── Empty state ── */
.empty { text-align: center; padding: 2.5rem; color: var(--text-3); font-size: 0.9rem; }
.empty-icon { font-size: 2rem; margin-bottom: 0.5rem; }

@media (max-width: 640px) {
  .cols { grid-template-columns: 1fr; }
  .stats { grid-template-columns: repeat(2, 1fr); }
}
</style>
</head>
<body>

<!-- Header -->
<header class="header">
  <div class="header-inner">
    <div class="header-logo">
      <div class="logo-badge">KDN</div>
      <div class="header-titles">
        <div class="header-title">KDN-iLPF</div>
        <div class="header-sub">Kementerian Dalam Negeri</div>
      </div>
    </div>
    <div class="header-divider"></div>
    <div class="header-label">Video Content Moderation</div>
    <div class="header-spacer"></div>
    <span class="header-tag">&#9679; Demo System</span>
  </div>
</header>

<div class="page">

  <!-- Page heading -->
  <div style="margin-bottom: 1.75rem;">
    <h1 style="font-size:1.5rem; font-weight:800; color:var(--text-1);">Video Content Moderation</h1>
    <p style="font-size:0.9rem; color:var(--text-2); margin-top:0.3rem;">Powered by Sightengine AI — detect nudity, violence, gore, weapons &amp; offensive content</p>
  </div>

  <!-- Stats -->
  <div class="stats">
    <div class="stat-card total">
      <div class="stat-label">Total Jobs</div>
      <div class="stat-value"><?= $stats['total'] ?></div>
    </div>
    <div class="stat-card flagged">
      <div class="stat-label">Flagged</div>
      <div class="stat-value"><?= $stats['flagged'] ?></div>
    </div>
    <div class="stat-card clean">
      <div class="stat-label">Clean</div>
      <div class="stat-value"><?= $stats['clean'] ?></div>
    </div>
    <div class="stat-card failed">
      <div class="stat-label">Failed</div>
      <div class="stat-value"><?= $stats['failed'] ?></div>
    </div>
  </div>

  <!-- Submit forms -->
  <div class="cols">

    <!-- URL submit -->
    <div class="card">
      <div class="card-header">
        <div class="card-icon blue">&#127758;</div>
        <div>
          <div class="card-title">Submit URL</div>
          <div class="card-desc">Moderate a video from a public URL</div>
        </div>
      </div>
      <div class="card-body">
        <form method="post" action="submit_url.php">
          <div class="field">
            <label>Video URL</label>
            <input type="url" name="video_url" required placeholder="https://example.com/video.mp4">
            <div class="hint">Direct link to .mp4, .mov, or .avi file</div>
          </div>
          <div class="field">
            <label>Mode</label>
            <select name="mode">
              <option value="sync">Sync — short clips (recommended)</option>
              <option value="async">Async — long videos (callback required)</option>
            </select>
            <div class="hint">Sync checks frames in real-time. Async for videos &gt; 2 min.</div>
          </div>
          <button type="submit" class="btn btn-primary btn-full">&#9654; Analyse Video</button>
        </form>
      </div>
    </div>

    <!-- Upload -->
    <div class="card">
      <div class="card-header">
        <div class="card-icon green">&#8593;</div>
        <div>
          <div class="card-title">Upload File</div>
          <div class="card-desc">Upload a local video file for moderation</div>
        </div>
      </div>
      <div class="card-body">
        <form method="post" action="submit_upload.php" enctype="multipart/form-data">
          <div class="field">
            <label>Select Video File</label>
            <input type="file" name="video" accept="video/mp4,video/quicktime,video/avi,video/*" required>
            <div class="hint">Max 100 MB &bull; MP4, MOV, AVI supported &bull; Sync mode only</div>
          </div>
          <div style="background:var(--amber-lt); border:1px solid #fde68a; border-radius:7px; padding:0.7rem 0.9rem; margin-bottom:1rem; font-size:0.8rem; color:#92400e;">
            &#9888; Large files may take up to 5 minutes to process.
          </div>
          <button type="submit" class="btn btn-outline btn-full">&#8679; Upload &amp; Analyse</button>
        </form>
      </div>
    </div>

  </div>

  <!-- Recent Jobs -->
  <div class="card">
    <div class="card-header" style="justify-content:space-between;">
      <div style="display:flex; align-items:center; gap:0.6rem;">
        <div class="card-icon blue">&#128196;</div>
        <div>
          <div class="card-title">Recent Jobs</div>
          <div class="card-desc">Last 20 moderation requests</div>
        </div>
      </div>
      <span style="font-size:0.8rem; color:var(--text-3);"><?= count($jobs) ?> records</span>
    </div>
    <div class="table-wrap">
      <?php if (empty($jobs)): ?>
        <div class="empty">
          <div class="empty-icon">&#128247;</div>
          No jobs yet. Submit a video above to get started.
        </div>
      <?php else: ?>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Source</th>
            <th>Type</th>
            <th>Mode</th>
            <th>Status</th>
            <th>Verdict</th>
            <th>Submitted</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($jobs as $j): ?>
          <tr>
            <td style="color:var(--text-3); font-size:0.8rem;"><?= $j['id'] ?></td>
            <td class="source" title="<?= htmlspecialchars($j['source_ref']) ?>"><?= htmlspecialchars($j['source_ref']) ?></td>
            <td style="font-size:0.8rem;"><?= ucfirst($j['source_type']) ?></td>
            <td style="font-size:0.8rem;"><?= $j['mode'] ?></td>
            <td>
              <span class="status-dot <?= $j['status'] ?>"></span>
              <span style="font-size:0.8rem; margin-left:0.4rem;"><?= ucfirst($j['status']) ?></span>
            </td>
            <td>
              <?php if ($j['verdict'] === 'flagged'): ?>
                <span class="verdict-pill flagged">&#9650; Flagged</span>
              <?php elseif ($j['verdict'] === 'clean'): ?>
                <span class="verdict-pill clean">&#10003; Clean</span>
              <?php else: ?>
                <span class="verdict-pill unknown">— <?= $j['verdict'] ?></span>
              <?php endif; ?>
            </td>
            <td style="font-size:0.8rem; color:var(--text-3); white-space:nowrap;"><?= $j['created_at'] ?></td>
            <td><a href="job.php?id=<?= $j['id'] ?>" class="view-link">View &#8594;</a></td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
      <?php endif; ?>
    </div>
  </div>

  <!-- Footer -->
  <div style="text-align:center; margin-top:2rem; font-size:0.75rem; color:var(--text-3);">
    KDN-iLPF Video Content Moderation Demo &bull; Powered by Sightengine AI &bull; For demonstration purposes only
  </div>

</div>
</body>
</html>
