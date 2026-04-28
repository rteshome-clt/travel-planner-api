import express from 'express';
import {
  createActivityHandler,
  getAllActivitiesHandler,
  getActivityByIdHandler,
  updateActivityHandler,
  deleteActivityHandler,
} from '../controllers/activityController.js';

const router = express.Router();

router.post('/', createActivityHandler);
router.get('/', getAllActivitiesHandler);
router.get('/:id', getActivityByIdHandler);
router.put('/:id', updateActivityHandler);
router.delete('/:id', deleteActivityHandler);

export default router;