const express = require('express');
const auth_middleware = require('./middleware/auth_middleware');

//const HomeModel = require('./model/home.model');

const router = express.Router();

const movieReviews = [];

router.get('/', function(request, response) {
    response.status(200).send(movieReviews);
});

router.post('/', (request, response) => {
    
});