import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
  // clear tables
  await prisma.$queryRaw`
    TRUNCATE activities, destinations, trips, users 
    RESTART IDENTITY CASCADE;
  `;

  // users
  const usersData = [
    { name: 'Ruth', email: 'ruth@test.com', password: 'password123' },
    { name: 'Bob', email: 'bob@test.com', password: 'password123' },
    { name: 'Admin', email: 'admin@test.com', password: 'admin123', role: 'ADMIN' },
  ];

  const users = [];

  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role || 'USER',
      },
    });

    users.push(user);
  }

  // trips, destinations, activities
  for (const user of users) {
    const trip = await prisma.trip.create({
      data: {
        title: `${user.name}'s Europe Trip`,
        startDate: new Date('2026-05-18T00:00:00Z'),
        endDate: new Date('2026-06-01T00:00:00Z'),
        budget: 1500,
        userId: user.id,
      },
    });

    const destination = await prisma.destination.create({
      data: {
        city: 'Paris',
        country: 'France',
        arrivalDate: new Date('2026-05-18T00:00:00Z'),
        departureDate: new Date('2026-05-22T00:00:00Z'),
        tripId: trip.id,
      },
    });

    await prisma.activity.createMany({
      data: [
        {
          name: 'Eiffel Tower Visit',
          description: 'Visit the Eiffel Tower',
          date: new Date('2026-05-19T00:00:00Z'),
          cost: 50,
          destinationId: destination.id,
        },
        {
          name: 'Louvre Museum',
          description: 'Explore the Louvre',
          date: new Date('2026-05-20T00:00:00Z'),
          cost: 30,
          destinationId: destination.id,
        },
      ],
    });
  }

  console.log('Seed completed successfully!');
} catch (error) {
  console.error('Seed failed:', error);
} finally {
  await prisma.$disconnect();
}