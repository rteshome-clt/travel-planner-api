import { createTrip, getTripById, getTripsByUser, updateTrip, deleteTrip } from "../services/tripService.js";

export async function getAllTripsHandler(req, res) {
  const trips = await getTripsByUser(req.user.id);
  res.status(200).json(trips);
}

export async function getTripByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const trip = await getTripById(id, req.user.id);
  res.status(200).json(trip);
}

export async function createTripHandler(req, res) {
  const { title, startDate, endDate, budget } = req.body;

  const newTrip = await createTrip({
    title,
    startDate,
    endDate,
    budget,
    userId: req.user.id,
  });

  res.status(201).json(newTrip);
}

export async function updateTripHandler(req, res) {
  const id = parseInt(req.params.id);
  const { title, startDate, endDate, budget } = req.body;

  const updatedTrip = await updateTrip(id, req.user.id, {
    title,
    startDate,
    endDate,
    budget,
  });

  res.status(200).json(updatedTrip);
}

export async function deleteTripHandler(req, res) {
  const id = parseInt(req.params.id);

  await deleteTrip(id, req.user.id);

  res.status(204).send();
}