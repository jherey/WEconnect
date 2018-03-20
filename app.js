import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import expressValidator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import routes from './server/routes/index';

dotenv.config();

const swaggerDocument = require('./swagger.json');

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

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
	message: 'Welcome to the beginning of nothingnessve.',
}));

// Listen for requests
const port = parseInt(process.env.PORT, 10) || 8000;
app.listen(port, () => {
	console.log(`Hi there, check me out on http://localhost:${port}`);
});

export default app;
