const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const connectMongodb = require('./init/mongodb');
const { authRoute, categoryRoute, fileRoute } = require('./routes');
const { errorHandler } = require('./middlewares');
const notfound = require('./controllers/notfound');

const app = express();

connectMongodb();

app.use(express.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use(morgan('dev'));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/file", fileRoute);


app.use(errorHandler);

app.use("*", notfound);
module.exports = app;