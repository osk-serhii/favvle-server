const app = require('./app');
const connectDb = require('./config/db').connectDb;

// connect db and run the server
connectDb().then(async () => {
    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () =>
        console.log(`App is listening on port ${PORT}!`)
    );
});