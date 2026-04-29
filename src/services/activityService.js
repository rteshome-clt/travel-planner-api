import {
  create,
  getAll,
  getByUser,
  getById,
  update,
  remove,
} from '../repositories/activityRepo.js';
import { getDestinationById } from './destinationService.js';

export async function createActivity(data, user) {
  await getDestinationById(data.destinationId, user);
  return await create(data);
}

export async function getActivities(user) {
  if (user.role === 'ADMIN') {
    return getAll();
  } 
  return await getByUser(user.id);
}

export async function getActivityById(id, user) {
  const activity = await getById(id);

  if (!activity) {
    const error = new Error('Activity not found');
    error.status = 404;
    throw error;
  }

  if (activity.destination.trip.userId !== user.id && user.role !== 'ADMIN') {
    const error = new Error('Forbidden');
    error.status = 403;
    throw error;
  }

  return activity;
}

export async function updateActivity(id, userId, data) {
  await getActivityById(id, userId);
  return await update(id, data);
}

export async function deleteActivity(id, userId) {
  await getActivityById(id, userId);
  return await remove(id);
}