import { createTrip, getTripById, getTripsByUser, updateTrip, deleteTrip } from "../services/tripService.js";
import { format } from 'date-fns';

function formatTrip(trip) {
  return {
    ...trip,
    startDate: format(trip.startDate, "yyyy-MM-dd"),
    endDate: format(trip.endDate, "yyyy-MM-dd"),
  };
}

export async function getAllTripsHandler(req, res) {
  const trips = await getTripsByUser(req.user);
  res.status(200).json(trips.map(formatTrip));
}

export async function getTripByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const trip = await getTripById(id, req.user);
  res.status(200).json(formatTrip(trip));
}

export async function createTripHandler(req, res) {
  const { title, startDate, endDate, budget } = req.body;

  const newTrip = await createTrip({
    title,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    budget,
    userId: req.user.id,
  });

  res.status(201).json(formatTrip(newTrip));
}

export async function updateTripHandler(req, res) {
  const id = parseInt(req.params.id);
  const { title, startDate, endDate, budget } = req.body;

  const updatedTrip = await updateTrip(id, req.user, {
    title,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    budget,
  });

  res.status(200).json(formatTrip(updatedTrip));
}

export async function deleteTripHandler(req, res) {
  const id = parseInt(req.params.id);

  await deleteTrip(id, req.user);

  res.status(204).send();
}