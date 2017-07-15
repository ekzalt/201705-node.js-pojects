const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const port = 3300;
const app = express();

const loger = (req, res, next) => {
  console.log(`${req.url} - ${req.method}`);
  next();
};

app.use(bodyParser.json());
app.use(loger);

app.post('/orders', (req, res) => {
  if (req.body) {
    res.status(200);
    res.json({
      message: 'Create order: Success!',
      id: 'enk543c',
    });
  } else {
    throw new Error('POST parameters is incorrect!');
  }
});

app.get('/orders', (req, res) => {
  res.status(200);
  res.json({
    message: 'Read orders: Success!',
    count: 2,
    page: 1,
    orders: [
      { id: 'iv49dfm', isCompleted: false, isActive: true },
      { id: 'enk543c', isCompleted: false, isActive: true },
    ],
  });
});

app.put('/orders', (req, res) => {
  if (req.body && 'id' in req.body) {
    res.status(200);
    res.json({
      message: 'Update order: Success!',
      order: req.body,
    });
  } else {
    throw new Error('PUT parameters are incorrect!');
  }
});

app.delete('/orders', (req, res) => {
  if (req.body && 'id' in req.body) {
    res.status(200);
    res.json({
      message: 'Update order: Success!',
      order: {
        id: req.body.id,
        isActive: false,
      },
    });
  } else {
    throw new Error('DELETE parameters are incorrect!');
  }
});

app.use((req, res, next) => {
  res.status(404);
  res.json({ status: 404, message: 'Route not found' });
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

http.createServer(app)
  .listen(port, 'localhost', () => {
    console.log('Server is listening on port %s', port);
  });
  