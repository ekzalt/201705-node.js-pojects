const { spawn } = require('child_process');

// 3 аргумента: 1. команда, 2. аргументы, 3. опции
const child = spawn('echo $ANSWER && find', ['.', '-type', 'f'], {
  stdio: 'inherit',
  shell: true,
  cwd: './',
  env: { ANSWER: 'Script is running' }
});
