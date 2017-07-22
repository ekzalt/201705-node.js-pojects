const logOut = fs.createWriteStream('./log_out.txt');
const logErr = fs.createWriteStream('./log_err.txt');

// new Console(stdout[, stderr])
// new Console(process.stdout, process.stderr);
const logger = new Console(logOut, logErr);

logger.log('LOG');
logger.error('ERR');
