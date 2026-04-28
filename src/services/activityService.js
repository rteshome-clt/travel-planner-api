import {
  create,
  getByUser,
  getById,
  update,
  remove,
} from '../repositories/activityRepo.js';

export async function createActivity(data) {
  return create(data);
}

export async function getActivities(userId) {
  return getByUser(userId);
}

export async function getActivityById(id, userId) {
  const activity = await getById(id);

  if (!activity) {
    const error = new Error('Activity not found');
    error.status = 404;
    throw error;
  }

  if (activity.destination.trip.userId !== userId) {
    const error = new Error('Forbidden');
    error.status = 403;
    throw error;
  }

  return activity;
}

export async function updateActivity(id, userId, data) {
  await getActivityById(id, userId);
  return update(id, data);
}

export async function deleteActivity(id, userId) {
  await getActivityById(id, userId);
  return remove(id);
}