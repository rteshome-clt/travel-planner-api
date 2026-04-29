import { create, getAll, getById, getByUser, update, remove } from "../repositories/tripRepo.js";

export async function createTrip(data) {
    return await create(data);
}

export async function getTripsByUser(user) {
    if (user.role === 'ADMIN') {
        return getAll();
    }
    return await getByUser(user.id);
}

export async function getTripById(id, user) {
    const trip = await getById(id);
    if (!trip) {
        const error = new Error('Trip not found');
        error.status = 404;
        throw error;
    }
    if (trip.userId !== user.id && user.role !== 'ADMIN') {
        const error = new Error('Forbidden');
        error.status = 403;
        throw error;
    }
    return trip;
}

export async function updateTrip(id, user, data) {
    await getTripById(id, user);
    const updatedTrip = await update(id, data);
    if (updatedTrip) return updatedTrip;
    else {
        const error = new Error(`Trip ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function deleteTrip(id, user) {
    await getTripById(id, user);
    const result = await remove(id);
    if (result) return;
    else {
        const error = new Error(`Trip ${id} not found`);
        error.status = 404;
        throw error;
    }
}