// require
const http = require('http');
const url = require('url');
const path = require('path');
const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;
const PASS = '1234';

////////////////////////////////////////////////////////////

// logger module
const logger = (req, res, next) => {
  console.log(`------ ${req.method} ${req.url} ------`);
  // console.log('------ headers ------\n', req.headers);
  next();
};

// parseUrl module
const parseUrl = (req, res, next) => {
  req.parsed = {};
  req.parsed.url = url.parse(req.url, true);
  next();
};

// parseCookie module
const parseCookie = (req, res, next) => {
  if (!req.headers.cookie) return next();

  let cookies = {};

  req.headers.cookie.split(';').forEach(cookie => {
    let parts = cookie.trim().split('=');

    cookies[parts[0]] = parts[1];
  });
  req.parsed.cookie = cookies;

  next();
};

// parseBody module
const parseBody = (req, res, next) => {
  let body = [];

  req.on('data', chunk => body.push(chunk));

  req.on('end', () => {
    body = body.toString();
    req.parsed.body = body;
    return next();
  });

  req.on('error', err => {
    return next(err);
  });
};

// onError module - сritical server error
const onError = (err, req, res, next) => {
  if (err) console.error(err);

  res.status(500).send('500 - Server error');
};

////////////////////////////////////////////////////////////

// routers - site page modules

// notFound module - 404 page
const notFound = (req, res) => {
  res.status(404).send('404 - Not found');
};

////////////////////////////////////////////////////////////

// fake DB
const users = [{
  id: 1,
  name: 'Test',
  deleted: false
}];

// show all DB (without deleted items)
const dbShow = arr => {
  let arrFiltered = arr.filter(item => item.deleted === false);
  return arrFiltered;
};

// find in DB
const dbFind = (arr, id) => {
  let result = null;
  arr.forEach(item => {
    if (item.id === id) result = item;
  });
  return result;
};

// add to DB
const dbAdd = (arr, item) => {
  arr.push(item);
};

// update in DB
const dbEdit = (arr, id, newItem) => {
  let result = null;
  arr.forEach((item, i) => {
    if (item.id === id) result = arr[i] = Object.assign({}, item, newItem);
  });
  return result;
};

// delete from DB
const dbRemove = (arr, id) => {
  let result = null;
  arr.forEach(item => {
    if (item.id === id) {
      item.deleted = true;
      result = item;
    }
  });
  return result;
};

////////////////////////////////////////////////////////////

const app = express();

// logger
app.use(logger);
// url
app.use(parseUrl);
// cookies
app.use(parseCookie);
// body
app.use(parseBody);

// routers - site pages

// user GET - url: http://localhost:3000/user/1
app.get('/user/:id', (req, res, next) => {
  console.log(`${req.method} ${req.url}`);

  // find in DB
  const userFind = dbFind(users, parseInt(req.params.id));
  console.log('userFind:', userFind);
  if (!userFind) return next();

  const content = {
    page: 'User',
    method: 'GET',
    operation: 'read',
    user: userFind,
    params: req.params,
    url: req.parsed.url,
    cookie: req.parsed.cookie || null,
    body: req.parsed.body || null
  };

  res.status(200).json(content);
});

// user POST - url: http://localhost:3000/user , JSON: { "id": 2, "name": "Vasya", "deleted": false }
app.post('/user', (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('req.parsed.body:\n', req.parsed.body);

  // add to DB
  const userPost = JSON.parse(req.parsed.body);
  console.log('userPost:', userPost);
  dbAdd(users, userPost);
  // find in DB
  const userFind = dbFind(users, userPost.id);
  console.log('userFind:', userFind);
  if (!userFind) return next();

  const content = {
    page: 'User',
    method: 'POST',
    operation: 'create',
    user: userFind,
    params: req.params,
    url: req.parsed.url,
    cookie: req.parsed.cookie || null,
    body: req.parsed.body || null
  };

  res.status(200).json(content);
});

// user PUT - url: http://localhost:3000/user/1 , JSON { "name": "Petya" }
app.put('/user/:id', (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('req.parsed.body:\n', req.parsed.body);

  // update in DB
  const userPut = JSON.parse(req.parsed.body);
  console.log('userPut:', userPut);
  const userEdited = dbEdit(users, parseInt(req.params.id), userPut);
  console.log('userEdited:', userEdited);
  if (!userEdited) return next();

  const content = {
    page: 'User',
    method: 'PUT',
    operation: 'update',
    user: userEdited,
    params: req.params,
    url: req.parsed.url,
    cookie: req.parsed.cookie || null,
    body: req.parsed.body || null
  };

  res.status(200).json(content);
});

// user DELETE - url: http://localhost:3000/user/1
app.delete('/user/:id', (req, res, next) => {
  console.log(`${req.method} ${req.url}`);

  // delete from DB
  const userDeleted = dbRemove(users, parseInt(req.params.id));
  console.log('userDeleted:', userDeleted);
  if (!userDeleted) return next();

  const content = {
    page: 'User',
    method: 'DELETE',
    operation: 'delete',
    user: userDeleted,
    params: req.params,
    url: req.parsed.url,
    cookie: req.parsed.cookie || null,
    body: req.parsed.body || null
  };

  res.status(200).json(content);
});

// users GET - url: http://localhost:3000/users
app.get('/users', (req, res, next) => {
  console.log(`${req.method} ${req.url}`);

  const all = dbShow(users);
  console.log('all:\n', all);

  const content = {
    page: 'Users',
    method: 'GET',
    operation: 'read',
    users: all,
    params: req.params,
    url: req.parsed.url,
    cookie: req.parsed.cookie || null,
    body: req.parsed.body || null
  };

  res.status(200).json(content);
});

// index GET - url: http://localhost:3000
app.get('/', (req, res, next) => {
  console.log(`${req.method} ${req.url}`);

  const content = {
    page: 'Index',
    method: 'GET',
    operation: 'read',
    params: req.params,
    url: req.parsed.url,
    cookie: req.parsed.cookie || null,
    body: req.parsed.body || null
  };

  res.status(200).json(content);
});

// 404 page
app.use(notFound);

// сritical server errors
app.use(onError);

http.createServer(app).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
