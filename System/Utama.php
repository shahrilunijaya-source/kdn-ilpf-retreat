<?php
require_once __DIR__ . '/config.php';
Auth::require();
$ilpf = (new IlpfData(Auth::id()))->build('dashboard');
$ilpfJson = json_encode($ilpf, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG);
?>
<!DOCTYPE html>
<html lang="ms">
<head>
<meta charset="UTF-8">
<title>Utama · iLPF</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="ilpf.css">
<script>
window.iLPF = <?= $ilpfJson ?>;
// Restore Date objects and utility functions lost in JSON serialisation
(function(d) {
  d.today = new Date();
  d.today.setHours(0,0,0,0);
  d.addDays = function(n) { var x = new Date(d.today); x.setDate(x.getDate() + n); return x; };
  if (d.me) {
    if (d.me.pelantikan) d.me.pelantikan = new Date(d.me.pelantikan);
    if (d.me.tamat)      d.me.tamat      = new Date(d.me.tamat);
  }
})(window.iLPF);
</script>
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
</head>
<body>
<div id="root"></div>

<script type="text/babel" src="js/icons.jsx"></script>
<script type="text/babel" src="js/shell.jsx"></script>
<script type="text/babel" src="js/aku-janji.jsx"></script>
<script type="text/babel" src="js/dashboard.jsx"></script>

<script type="text/babel">
const LIVE_STATE = <?= json_encode([
    'state'         => $ilpf['state'],
    'showAkuJanji'  => $ilpf['showAkuJanji'],
    'tod'           => $ilpf['tod'],
    'akuVariant'    => 'v2',
]) ?>;

function App() {
  const [t, setT] = React.useState(LIVE_STATE);
  const set = (k, v) => setT(prev => ({ ...prev, [k]: v }));
  return (
    <Shell activeKey="utama" context="Ruang Kerja ALPF" logoutUrl="logout.php">
      <Dashboard
        state={t.state}
        showAkuJanji={t.showAkuJanji}
        tod={t.tod}
        akuVariant={t.akuVariant}
      />
    </Shell>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
</script>
</body>
</html>
