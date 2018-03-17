import http from 'http';
import dotenv from 'dotenv';
import app from '../app';

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
