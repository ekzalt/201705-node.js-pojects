const fs = require('fs');
const { Console } = console;

const logOut = fs.createWriteStream('./log_out.txt');
const logErr = fs.createWriteStream('./log_err.txt');

// new Console(stdout[, stderr])
// new Console(process.stdout, process.stderr);
const fileLogger = new Console(logOut, logErr);

fileLogger.log('LOG');
fileLogger.error('ERR');
