import express from 'express';
import {
  createTripHandler,
  getAllTripsHandler,
  getTripByIdHandler,
  updateTripHandler,
  deleteTripHandler,
} from '../controllers/tripController.js';

import { 
  validateTripId,
  validateCreateTrip,
  validateUpdateTrip
} from '../middleware/tripValidators.js';

const router = express.Router();

router.post('/', validateCreateTrip, createTripHandler);
router.get('/', getAllTripsHandler);
router.get('/:id', validateTripId, getTripByIdHandler);
router.put('/:id', validateTripId,validateUpdateTrip, updateTripHandler);
router.delete('/:id', validateTripId, deleteTripHandler);

export default router;