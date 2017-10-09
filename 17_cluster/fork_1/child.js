let counter = 0;

process.on('message', msg => console.log('Message from parent:\n', msg));

setInterval(() => {
  process.send({ counter: counter++ });
}, 1000);
