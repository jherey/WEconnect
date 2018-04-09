import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import webpack from 'webpack';
import webpackServer from 'webpack-dev-middleware';
import devWebpackConfig from '../webpack.dev';
import prodWebpackConfig from '../webpack.prod';
import routes from './routes/index';

const swaggerDocument = require('../swagger.json');

// Set up the express app
const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackServer(webpack(devWebpackConfig)));
} else {
  app.use(webpackServer(webpack(prodWebpackConfig)));
}

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Setup a default catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

export default app;