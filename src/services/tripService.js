import { create, getById, getByUser, update, remove } from "../repositories/tripRepo.js";

export async function createTrip(data) {
    return await create(data);
}

export async function getTripsByUser(userId) {
    return await getByUser(userId);
}

export async function getTripById(id, userId) {
    const trip = await getById(id);
    if (!trip) {
        const error = new Error('Trip not found');
        error.status = 404;
        throw error;
    }
    if (trip.userId !== userId) {
        const error = new Error('Forbidden');
        error.status = 403;
        throw error;
    }
    return trip;
}

export async function updateTrip(id, userId, data) {
    await getTripById(id, userId);
    const updatedTrip = await update(id, data);
    if (updatedTrip) return updatedTrip;
    else {
        const error = new Error(`Trip ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function deleteTrip(id, userId) {
    await getTripById(id, userId);
    const result = await remove(id);
    if (result) return;
    else {
        const error = new Error(`Trip ${id} not found`);
        error.status = 404;
        throw error;
    }
}