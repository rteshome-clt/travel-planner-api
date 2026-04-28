import express from 'express';
import {
  createTripHandler,
  getAllTripsHandler,
  getTripByIdHandler,
  updateTripHandler,
  deleteTripHandler,
} from '../controllers/tripController.js';

const router = express.Router();

router.post('/', createTripHandler);
router.get('/', getAllTripsHandler);
router.get('/:id', getTripByIdHandler);
router.put('/:id', updateTripHandler);
router.delete('/:id', deleteTripHandler);

export default router;