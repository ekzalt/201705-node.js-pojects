const http = require('http');

const express = require('express');

const app = express();

const apiUrl = '/api/v1/';


const getOrders = (req, res, next) => {


    res.status(200);

    res.json({status:200, message: 'GET orders'});


    next();


};

const getOrderById = (req, res, next) => {

    res.status(200);

    res.json({status:200, message: 'GET order by id'});

    next();
};


const createOrder = (req, res, next) => {

    res.status(200);

    res.json({status:200, message: 'POST order'});

    next();

};


const updateOrder = (req, res, next) => {

    res.status(200);

    res.json({status:200, message: 'PUT order'});

    next();

};



const deleteOrder = (req, res, next) => {

    res.status(200);

    res.json({status:200, message: 'DELETE order'});

    next();


};


const notFound = (req, res, next) => {

    // res.writeHead(404, {'Content-Type': 'aplication/json'});

    res.status(404);

    res.end(JSON.stringify({status:404, message: 'Not Found'}));

    next();

};





app.get(`${apiUrl}orders`, getOrders);

app.get(`${apiUrl}order/:id`, getOrderById);

app.post(`${apiUrl}order`, createOrder);

app.put(`${apiUrl}order/:id`, updateOrder);

app.delete(`${apiUrl}order/:id`, deleteOrder);

app.use(notFound);


http.createServer(app).listen(3000, 'localhost');
