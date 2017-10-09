const { spawn } = require('child_process');

const child = spawn('pwd', ['.', '-type', 'r'], {
  stdio: 'inherit',
  shell: true,
  cwd: './',
  env: {
    ANSVER: 'hello'
  }
});

child.stdout.on('data', data => {
  //
});

child.stderr.on('data', err => {
  //
});

child.stdout.pipe(child2.stdin);




const { exec } = require('child_process');

exec('ls', (err, stdout, stderr) => {
  if (err) doSome;

  doOther;
});




// some.js
function someFoo() {}
process.on('message', msg => {
  let result = someFoo();
  process.send(result);
})

const { fork } = require('child_process');

foked = fork('./some.js')

forked.send('start');
forked.on('message', result => {
  //
  return result;
});



const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpus = os.cpus().length;

  for (let i = 0; i < cpus.length; i++) cluster.fork();

  cluster.on('exit', (worker, code, signal) => {
    if (code !== !worker.exitedAfterDisconnect) cluster.fork();
  });

  Object.values(cluster.workers).forEach(worker => {
    worker.send(data);
  });
} else {
  require('./server');
}
