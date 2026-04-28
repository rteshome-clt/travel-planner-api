import prisma from "../config/db.js";

//create a new trip
export async function create(data) {
    try{ 
        const newTrip = await prisma.trip.create({ data });
        return newTrip;
    } catch (error) {
        console.error('Error creating trip:', error);
        throw error;
    }
}


//get all trips belonging to a user
export async function getByUser(userId) {
    const trip = await prisma.trip.findMany({ 
        where: { userId }
    });
    return trip;
}

//get trip by id
export async function getById(id) {
    const trip = await prisma.trip.findUnique({
        where: { id }
    });
    return trip;
}

// update trip by id
export async function update(id, updatedData) {
    try {
        const updatedTrip = await prisma.trip.update({
        where: { id },
        data: updatedData
    });
    return updatedTrip;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;   
    }
}

// delete trip by id
export async function remove(id) {
    try {
        const trip = await prisma.trip.delete({
        where: { id }
    });
    return trip;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;    
    }
}