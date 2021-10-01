const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/api.json');

require('dotenv').config(); // use .env file as config

const connectDb = require('./config/db').connectDb;
const { options } = require('./routes/index');


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

// connect db and run the server
connectDb().then(async () => {
    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () =>
        console.log(`App is listening on port ${PORT}!`),
    );
});