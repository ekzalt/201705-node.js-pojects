const cluster = require('cluster');
const os = require('os');

const numberOfUsersInDB = function() {
  this.count = this.count || 5;
  this.count = this.count * this.count;

  return this.count;
};

const updateWorkers = () => {
  const userCount = numberOfUsersInDB();

  console.log(cluster);

  Object.values(cluster.workers).forEach(worker => worker.send({ userCount }));
};

if (cluster.isMaster) {
  const cpus = os.cpus();

  console.log(`Fork for ${cpus.length} CPUs`);

  for (let i = 0; i < cpus.length; i++) cluster.fork();

  updateWorkers();
  setInterval(updateWorkers, 5000);

} else {
  require('./server');
}
