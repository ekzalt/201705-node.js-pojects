process.stdin.setEncoding('utf8');

// process.stdin.pipe(process.stdout);
// process.stdin.resume();

// STDIN
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();

  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});

process.stdin.on('error', err => {
  process.stderr.write(err);
});

// STDOUT
process.stdout.on('data', data => {
  console.log(`stdout: ${data}`);
});

// STDERR
process.stderr.on('data', err => {
  console.log(`stderr: ${err}`);
});
