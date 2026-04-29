import {
  create,
  getAll,
  getByUser,
  getById,
  update,
  remove,
} from '../repositories/destinationRepo.js';
import { getTripById } from './tripService.js';

export async function createDestination(data, user) {
  await getTripById(data.tripId, user);
  const destination = await create(data);
  return destination;
}

export async function getDestinations(user) {
  if (user.role === 'ADMIN') {
    return getAll();
  }
  return getByUser(user.id);
}

export async function getDestinationById(id, user) {
  const destination = await getById(id);

  if (!destination) {
    const error = new Error('Destination not found');
    error.status = 404;
    throw error;
  }

  if (destination.trip.userId !== user.id && user.role !== 'ADMIN') {
    const error = new Error('Forbidden');
    error.status = 403;
    throw error;
  }

  return destination;
}

export async function updateDestination(id, user, data) {
  await getDestinationById(id, user);
  return update(id, data);
}

export async function deleteDestination(id, user) {
  await getDestinationById(id, user);
  return remove(id);
}