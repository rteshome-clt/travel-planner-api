import prisma from '../config/db.js';

export async function getAll() {
  const activities = await prisma.activity.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      destination: {
        include: {
          trip: true,
        },
      },
    },
  });
  return activities;
}

export async function create(data) {
  return prisma.activity.create({ data });
}

export async function getByUser(userId) {
  const activities = await prisma.activity.findMany({
    where: {
      destination: {
        trip: {
          userId,
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
  });
  return activities;
}

export async function getById(id) {
  return prisma.activity.findUnique({
    where: { id },
    include: {
      destination: {
        include: {
          trip: true,
        },
      },
    },
  });
}

export async function update(id, data) {
  return prisma.activity.update({
    where: { id },
    data
  });
}

export async function remove(id) {
  return prisma.activity.delete({
    where: { id }
  });
}