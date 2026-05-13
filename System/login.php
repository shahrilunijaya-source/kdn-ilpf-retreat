<?php
require_once __DIR__ . '/config.php';
Auth::start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    $body   = json_decode(file_get_contents('php://input'), true) ?? [];
    $action = $body['action'] ?? 'creds';

    if ($action === 'creds') {
        $email = trim($body['email'] ?? '');
        $pass  = $body['password'] ?? '';
        if ($email && $pass && Auth::login($email, $pass)) {
            $_SESSION['ilpf_otp_pending'] = true;
            echo json_encode(['ok' => true]);
        } else {
            http_response_code(401);
            echo json_encode(['ok' => false, 'error' => 'E-mel atau kata laluan tidak sah.']);
        }
    } elseif ($action === 'otp') {
        $code = trim($body['code'] ?? '');
        if (!Auth::check() || empty($_SESSION['ilpf_otp_pending'])) {
            echo json_encode(['ok' => false, 'error' => 'Sesi tamat. Cuba log masuk semula.']);
        } elseif (strlen($code) !== 6 || !ctype_digit($code)) {
            echo json_encode(['ok' => false, 'error' => 'Kod OTP tidak sah. Cuba semula.']);
        } else {
            unset($_SESSION['ilpf_otp_pending']);
            echo json_encode(['ok' => true, 'redirect' => 'Utama.php']);
        }
    }
    exit;
}

if (Auth::check()) {
    header('Location: Utama.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="ms">
<head>
<meta charset="UTF-8">
<title>Log Masuk · iLPF</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="ilpf.css">
<style>
  html, body, #root { height: 100%; }
  body { overflow: hidden; }
  @media (max-width: 880px) {
    .vb-page { grid-template-columns: 1fr !important; grid-template-rows: auto 1fr; }
    .vb-left { padding: 28px 28px 22px; }
    .vb-left__hero { font-size: 30px !important; }
    .vb-left__decisive { display: none !important; }
    .vb-right { padding: 32px 24px; }
  }
</style>
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
</head>
<body>
<div id="root"></div>

<script type="text/babel" src="js/login-variants.jsx"></script>

<script type="text/babel">
function App() {
  const handleLogin = ({ userId, password }, done) => {
    fetch('login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'creds', email: userId, password }),
    })
      .then(r => r.json())
      .then(data => done({ ok: data.ok, error: data.error }))
      .catch(() => done({ ok: false, error: 'Ralat rangkaian. Cuba semula.' }));
  };

  const handleOtp = ({ code }, done) => {
    fetch('login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'otp', code }),
    })
      .then(r => r.json())
      .then(data => done(data))
      .catch(() => done({ ok: false, error: 'Ralat rangkaian. Cuba semula.' }));
  };

  return <LoginB otpLen={6} phone="016-2217576" onSubmitCreds={handleLogin} onSubmitOtp={handleOtp} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
</script>
</body>
</html>
