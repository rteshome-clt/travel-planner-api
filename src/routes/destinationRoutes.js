import express from 'express';
import {
  createDestinationHandler,
  getAllDestinationsHandler,
  getDestinationByIdHandler,
  updateDestinationHandler,
  deleteDestinationHandler,
} from '../controllers/destinationController.js';

import {
  validateDestinationId,
  validateCreateDestination,
  validateUpdateDestination
} from '../middleware/destinationValidators.js';

const router = express.Router();

router.post('/', validateCreateDestination, createDestinationHandler);
router.get('/', getAllDestinationsHandler);
router.get('/:id', validateDestinationId, getDestinationByIdHandler);
router.put('/:id', validateDestinationId, validateUpdateDestination, updateDestinationHandler);
router.delete('/:id', validateDestinationId, deleteDestinationHandler);

export default router;