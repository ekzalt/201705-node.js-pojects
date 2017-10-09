const { exec } = require('child_process');

exec('ls', (err, stdout, stderr) => {
  if (err) return console.error(`exec err:\n${err}`);

  console.log(`File list:\n${stdout}`);
});
