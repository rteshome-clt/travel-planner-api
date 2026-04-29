import {
  createDestination,
  getDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
} from '../services/destinationService.js';
import { format } from 'date-fns';

function formatDestination(destination) {
  return {
    ...destination,
    arrivalDate: format(destination.arrivalDate, "yyyy-MM-dd"),
    departureDate: format(destination.departureDate, "yyyy-MM-dd"),
  };
}


export async function getAllDestinationsHandler(req, res) {
  const destinations = await getDestinations(req.user.id);
  res.status(200).json(destinations.map(formatDestination));
}

export async function getDestinationByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const destination = await getDestinationById(id, req.user.id);
  res.status(200).json(formatDestination(destination));
}

export async function createDestinationHandler(req, res) {
  const { city, country, arrivalDate, departureDate, tripId } = req.body;

  const newDestination = await createDestination(
    {
      city,
      country,
      arrivalDate: new Date(arrivalDate),
      departureDate: new Date(departureDate),
      tripId,
    },
    req.user.id
  );

  res.status(201).json(formatDestination(newDestination));
}

export async function updateDestinationHandler(req, res) {
  const id = parseInt(req.params.id);
  const { city, country, arrivalDate, departureDate } = req.body;

  const updatedDestination = await updateDestination(id, req.user.id, {
    city,
    country,
    arrivalDate: new Date(arrivalDate),
    departureDate: new Date(departureDate),
  });

  res.status(200).json(formatDestination(updatedDestination));
}

export async function deleteDestinationHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteDestination(id, req.user.id);
  res.status(204).send();
}