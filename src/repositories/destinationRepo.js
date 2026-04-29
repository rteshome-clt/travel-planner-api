import prisma from '../config/db.js';

export async function getAll() {
  const destinations = await prisma.destination.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      trip: true,
    },
  });
  return destinations;
}

export async function getByUser(userId) {
  const destinations = await prisma.destination.findMany({
    where: {
      trip: {
        userId,
      },
    },
    orderBy: {
      id: 'asc',
    },
  });
  return destinations;  
}

export async function create(data) {
  return prisma.destination.create({ data });
}

export async function getById(id) {
  return prisma.destination.findUnique({
    where: { id },
    include: {
      trip: true,
    },
  });
}

export async function update(id, data) {
  return prisma.destination.update({
    where: { id },
    data
  });
}

export async function remove(id) {
  return prisma.destination.delete({
    where: { id },
  });
}