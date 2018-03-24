import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/index';

const swaggerDocument = require('../swagger.json');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Validator to check requests
app.use(expressValidator());

// Versioning and Routes
app.use('/api/v1/', routes);

// Document API with Swagger
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Setup a default catch-all route
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

export default app;
