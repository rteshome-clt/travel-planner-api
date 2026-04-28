
import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import destinationRoutes from './routes/destinationRoutes.js';
import activityRoutes from './routes/activityRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
if (process.env.NODE_ENV !== 'test') app.use(morgan('tiny'));



app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/activities', activityRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;

  res.status(status).json({
    error: err.message || 'Internal server error',
  });
});

app.use((req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = 'Internal server error';
  }
  res.status(err.status).json({
    error: err.message,
  });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

export default app;