import prisma from '../config/db.js';

export async function create(data) {
  return prisma.destination.create({ data });
}

export async function getByUser(userId) {
  return prisma.destination.findMany({
    where: {
      trip: {
        userId,
      },
    }
  });
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