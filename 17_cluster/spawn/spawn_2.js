const { spawn } = require('child_process');

const find = spawn('find', ['.', '-type', 'f']);
const wc = spawn('wc', ['-l']);

// проброс данных из одной команды в другую по типу: find | wc (в системе linux)
find.stdout.pipe(wc.stdin);
wc.stdout.on('data', data => console.log(`Number of files ${data}`));
