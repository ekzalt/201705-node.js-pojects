const { spawn } = require('child_process');

const ls = spawn('ls');

ls.stdout.on('data', data => console.log('child.stdout:\n', data.toString('utf8')));
ls.stderr.on('data', err => console.error('child.stderr:\n', err));
ls.on('exit', (code, signal) => console.log(`child process exit whith code: ${code}, signal: ${signal}`));

/*
oher events of spawn instance (child)
- disconnect
- error
- message
- close

stdio objects:
child.stdin(writable)
child.stdout(readable)
child.stderr(readable)
*/