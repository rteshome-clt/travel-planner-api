import express from 'express';
import {
  createActivityHandler,
  getAllActivitiesHandler,
  getActivityByIdHandler,
  updateActivityHandler,
  deleteActivityHandler,
} from '../controllers/activityController.js';

import {
  validateActivityId,
  validateCreateActivity,
  validateUpdateActivity
} from '../middleware/activityValidators.js'; 

const router = express.Router();

router.post('/', validateCreateActivity, createActivityHandler);
router.get('/', getAllActivitiesHandler);
router.get('/:id', validateActivityId, getActivityByIdHandler);
router.put('/:id', validateActivityId, validateUpdateActivity, updateActivityHandler);
router.delete('/:id', validateActivityId, deleteActivityHandler);

export default router;