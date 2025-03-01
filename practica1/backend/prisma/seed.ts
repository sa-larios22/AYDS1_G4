import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Crear usuarios
  const users = await Promise.all([
    prisma.user.create({ data: { name: 'Juan', lastname: 'Pérez', username: 'juanperez', email: 'juan@example.com', password: 'hashedpassword', role: 'USER' } }),
    prisma.user.create({ data: { name: 'Ana', lastname: 'Gomez', username: 'anagomez', email: 'ana@example.com', password: 'hashedpassword', role: 'ADMIN' } }),
    prisma.user.create({ data: { name: 'Carlos', lastname: 'Rodriguez', username: 'carlosr', email: 'carlos@example.com', password: 'hashedpassword', role: 'USER' } }),
    prisma.user.create({ data: { name: 'Maria', lastname: 'Lopez', username: 'marialopez', email: 'maria@example.com', password: 'hashedpassword', role: 'PERSONAL' } }),
    prisma.user.create({ data: { name: 'Luis', lastname: 'Fernandez', username: 'luisfer', email: 'luis@example.com', password: 'hashedpassword', role: 'USER' } }),
  ]);

  // Crear gates
  const gates = await Promise.all([
    prisma.gate.create({ data: { name: 'Gate A1' } }),
    prisma.gate.create({ data: { name: 'Gate B2' } }),
    prisma.gate.create({ data: { name: 'Gate C3' } }),
    prisma.gate.create({ data: { name: 'Gate D4' } }),
    prisma.gate.create({ data: { name: 'Gate E5' } }),
  ]);

  // Crear vuelos
  const flights = await Promise.all([
    prisma.flight.create({ data: { origin: 'New York', destination: 'Los Angeles', departure: new Date(), arrival: new Date(), price: 300, maxPassengers: 150, soldTickets: 10, status: 'SCHEDULED', GateId: gates[0].id } }),
    prisma.flight.create({ data: { origin: 'Miami', destination: 'Chicago', departure: new Date(), arrival: new Date(), price: 250, maxPassengers: 120, soldTickets: 20, status: 'LANDED', GateId: gates[1].id } }),
    prisma.flight.create({ data: { origin: 'San Francisco', destination: 'Houston', departure: new Date(), arrival: new Date(), price: 400, maxPassengers: 200, soldTickets: 30, status: 'AT_GATE', GateId: gates[2].id } }),
    prisma.flight.create({ data: { origin: 'Atlanta', destination: 'Boston', departure: new Date(), arrival: new Date(), price: 150, maxPassengers: 180, soldTickets: 15, status: 'SCHEDULED', GateId: gates[3].id } }),
    prisma.flight.create({ data: { origin: 'Seattle', destination: 'Denver', departure: new Date(), arrival: new Date(), price: 180, maxPassengers: 140, soldTickets: 12, status: 'SCHEDULED', GateId: gates[4].id } }),
  ]);

  // Crear tickets con `create`
  const tickets = await Promise.all([
    prisma.ticket.create({ data: { type: 'ECONOMY', price: 300.00, availableSeats: 100, soldSeats: 50, totalSeats: 150, created_by: users[0].id, flightId: flights[0].id } }),
    prisma.ticket.create({ data: { type: 'BUSINESS', price: 500.00, availableSeats: 50, soldSeats: 10, totalSeats: 60, created_by: users[1].id, flightId: flights[1].id } }),
    prisma.ticket.create({ data: { type: 'FIRST_CLASS', price: 1000.00, availableSeats: 30, soldSeats: 5, totalSeats: 35, created_by: users[2].id, flightId: flights[2].id } }),
    prisma.ticket.create({ data: { type: 'ECONOMY', price: 250.00, availableSeats: 120, soldSeats: 30, totalSeats: 150, created_by: users[3].id, flightId: flights[3].id } }),
    prisma.ticket.create({ data: { type: 'ECONOMY', price: 180.00, availableSeats: 80, soldSeats: 20, totalSeats: 100, created_by: users[4].id, flightId: flights[4].id } }),
  ]);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
