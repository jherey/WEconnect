import dotenv from 'dotenv';
import app from './server/index';

dotenv.config();

// Listen for requests
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Hi there, check me out on http://localhost:${port}`);
});

export default app;
