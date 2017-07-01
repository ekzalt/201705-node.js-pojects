// http.Server -> net.Server -> EventEmitter
const http = require('http');
const url = require('url');
const server = new http.Server();

let counter = 0;
// in browser => http://127.0.0.1:1337/echo?name=Hello
server.on('request', (req, res) => {
	let urlParse = url.parse(req.url, true);
	console.log('urlParse:\n', urlParse);

	if (urlParse.pathname === '/echo' && urlParse.query.name) {
		res.end(urlParse.query.name);

	} else {
		res.statusCode = 404;
		res.end('Page not found');
	}	
});

// события: listening, connection, request
server.listen(3000, '127.0.0.1');

console.log('server: start on port 3000');
