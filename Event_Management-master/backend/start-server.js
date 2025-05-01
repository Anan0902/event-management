const { exec } = require('child_process');
const PORT = 5001;

function killPort(port, callback) {
  exec(`netstat -aon | findstr :${port}`, (err, stdout) => {
    if (err || !stdout) {
      console.log(`✅ Port ${port} is free.`);
      return callback();
    }

    const lines = stdout.trim().split('\n');
    const pids = new Set();

    lines.forEach(line => {
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid !== '0') pids.add(pid);
    });

    if (pids.size === 0) {
      console.log(`✅ Port ${port} appears free.`);
      return callback();
    }

    const killCmd = Array.from(pids).map(pid => `taskkill /PID ${pid} /F`).join(' & ');
    console.log(`⚠️ Killing processes on port ${port}:`, [...pids].join(', '));

    exec(killCmd, (killErr) => {
      if (killErr) {
        console.error(`❌ Failed to kill processes:`, killErr.message);
      } else {
        console.log(`✅ Freed port ${port}`);
      }
      callback();
    });
  });
}

killPort(PORT, () => {
  console.log('🚀 Starting server...');
  exec('nodemon app.js', { cwd: __dirname, stdio: 'inherit' });
});
