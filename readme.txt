ES6: генераторы и промисы

Паттерны проектирования

immutable.js (приоритет)
vanilla.js

promise lib: bluebird

-----------------------------------------------------------------

"eslint": "^4.1.1",
  "eslint-config-airbnb": "^15.0.1",
  "eslint-plugin-import": "^2.6.1"
{
  "extends": "airbnb-base"
}

https://www.npmjs.com/package/eslint-config-airbnb-base
npm install --save-dev eslint-config-airbnb-base eslint@^#.#.# eslint-plugin-import@^#.#.#

npm install --save-dev eslint-config-airbnb-base eslint eslint-plugin-import

-----------------------------------------------------------------

Модули для нативного node.js

concat-stream
https://www.npmjs.com/package/concat-stream
https://github.com/maxogden/concat-stream
npm install concat-stream

body
https://www.npmjs.com/package/body
https://github.com/Raynos/body
npm install body

router
https://www.npmjs.com/package/router
https://github.com/pillarjs/router
npm install router

-----------------------------------------------------------------

Framework connect

https://www.npmjs.com/package/connect
https://github.com/senchalabs/connect
npm install connect

connect.session
http://www.senchalabs.org/connect/session.html

connect.cookieParser
http://www.senchalabs.org/connect/cookieParser.html

connect.bodyParser
http://www.senchalabs.org/connect/bodyParser.html

-----------------------------------------------------------------

кастомный cookieParser
https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server

-----------------------------------------------------------------

express bodyParser - parsing application/json, parsing application/x-www-form-urlencoded

https://www.npmjs.com/package/body-parser
https://github.com/expressjs/body-parser
npm install body-parser

const bodyParser = require('body-parser');
// актуальные настройки
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

-----------------------------------------------------------------

express multer - parsing multipart/form-data

https://www.npmjs.com/package/multer
https://github.com/expressjs/multer
npm install --save multer

const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data








