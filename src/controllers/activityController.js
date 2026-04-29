import {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
} from '../services/activityService.js';
import { format } from 'date-fns';

function formatActivity(activity) {
  return {
    ...activity,
    date: format(activity.date, "yyyy-MM-dd"),
  };
}

export async function getAllActivitiesHandler(req, res) {
  const activities = await getActivities(req.user.id);
  res.status(200).json(activities.map(formatActivity));
}

export async function getActivityByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const activity = await getActivityById(id, req.user.id);
  res.status(200).json(formatActivity(activity));
}

export async function createActivityHandler(req, res) {
  const { name, description, date, cost, destinationId } = req.body;

  const newActivity = await createActivity({
    name,
    description,
    date: new Date(date),
    cost,
    destinationId,
  });

  res.status(201).json(formatActivity(newActivity));
}

export async function updateActivityHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name, description, date, cost } = req.body;

  const updatedActivity = await updateActivity(id, req.user.id, {
    name,
    description,
    date: new Date(date),
    cost,
  });

  res.status(200).json(formatActivity(updatedActivity));
}

export async function deleteActivityHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteActivity(id, req.user.id);
  res.status(204).send();
}