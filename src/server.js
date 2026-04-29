
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import destinationRoutes from './routes/destinationRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import { authenticate } from './middleware/authenticate.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
if (process.env.NODE_ENV !== 'test') app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Travel Planner API is running' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

let specs;
try {
  specs = yaml.load(fs.readFileSync('./docs/openapi.yaml', 'utf8'));
} catch (error) {
  console.error('Error loading OpenAPI specification', error);
  process.exit(1);
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/auth', authRoutes);
app.use('/api/trips', authenticate, tripRoutes);
app.use('/api/destinations', authenticate,destinationRoutes);
app.use('/api/activities', authenticate, activityRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
  });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

export default app;