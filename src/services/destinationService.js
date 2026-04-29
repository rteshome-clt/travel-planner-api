import {
  create,
  getByUser,
  getById,
  update,
  remove,
} from '../repositories/destinationRepo.js';

export async function createDestination(data, userId) {
  await getByUser(data.tripId, userId);
  const destination = await create(data);
  return destination;
}

export async function getDestinations(userId) {
  return getByUser(userId);
}

export async function getDestinationById(id, userId) {
  const destination = await getById(id);

  if (!destination) {
    const error = new Error('Destination not found');
    error.status = 404;
    throw error;
  }

  if (destination.trip.userId !== userId) {
    const error = new Error('Forbidden');
    error.status = 403;
    throw error;
  }

  return destination;
}

export async function updateDestination(id, userId, data) {
  await getDestinationById(id, userId);
  return update(id, data);
}

export async function deleteDestination(id, userId) {
  await getDestinationById(id, userId);
  return remove(id);
}