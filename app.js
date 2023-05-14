const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const authRouter = require('./routes/api/auth');

const petsRouter = require('./routes/api/pets');

const noticesRouter = require('./routes/api/notices');
const newsRouter = require('./routes/api/news');
const sponsorsRouter = require('./routes/api/sponsors');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static('public'));
app.use('/users', authRouter);
app.use('/pets', petsRouter);

app.use('/notices', noticesRouter);
app.use('/news', newsRouter);
app.use('/sponsors', sponsorsRouter);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// const swaggerSpec = swaggerJsdoc(swaggerOptions);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message });
});

module.exports = app;
