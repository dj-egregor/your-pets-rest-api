const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json');

// const swaggerOptions = {
//     swaggerDefinition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'YourPet API',
//             version: '1.0.0',
//         },
//     },
//     apis: ['./routes/api/*.js'], // путь к файлам с маршрутами вашего приложения
// };

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');

const petsRouter = require('./routes/api/pets');

// const petsRouter = require('./routes/api/pets');
const noticesRouter = require('./routes/api/notices');
const newsRouter = require('./routes/api/news.js');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static('public'));
app.use('/users', authRouter);
app.use('/pets', petsRouter);
app.use('/api/contacts', contactsRouter);

app.use('/notices', noticesRouter);
app.use('/news', newsRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
