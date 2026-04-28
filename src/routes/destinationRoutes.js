import express from 'express';
import {
  createDestinationHandler,
  getAllDestinationsHandler,
  getDestinationByIdHandler,
  updateDestinationHandler,
  deleteDestinationHandler,
} from '../controllers/destinationController.js';

const router = express.Router();

router.post('/', createDestinationHandler);
router.get('/', getAllDestinationsHandler);
router.get('/:id', getDestinationByIdHandler);
router.put('/:id', updateDestinationHandler);
router.delete('/:id', deleteDestinationHandler);

export default router;