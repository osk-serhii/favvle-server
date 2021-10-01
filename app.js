const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/api.json');

require('dotenv').config(); // use .env file as config

// App setup
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); // Enable CORS for api requests

// Routes
app.use('/', require('./routes/index'));

// Serve Swagger api
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: false
}));

module.exports = app;