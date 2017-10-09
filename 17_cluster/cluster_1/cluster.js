const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpus = os.cpus();

  console.log(cpus);
  console.log(`Fork for ${cpus.length} CPUs`);

  for (let i = 0; i < cpus.length; i++) cluster.fork();

} else {
  require('./server');
}
