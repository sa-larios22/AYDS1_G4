import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insertar Usuarios
  const users = await prisma.user.createMany({
    data: [
      { name: 'Juan', lastname: 'Pérez', username: 'juanp', email: 'juan@example.com', password: 'hashedpassword1', active: true, role: 'USER' },
      { name: 'Ana', lastname: 'López', username: 'analo', email: 'ana@example.com', password: 'hashedpassword2', active: true, role: 'ADMIN' },
      { name: 'Carlos', lastname: 'Gómez', username: 'carlg', email: 'carlos@example.com', password: 'hashedpassword3', active: true, role: 'USER' },
      { name: 'María', lastname: 'Fernández', username: 'mariaf', email: 'maria@example.com', password: 'hashedpassword4', active: true, role: 'PERSONAL' },
      { name: 'Pedro', lastname: 'Ramírez', username: 'pedror', email: 'pedro@example.com', password: 'hashedpassword5', active: true, role: 'USER' },
      { name: 'Sofía', lastname: 'Martínez', username: 'sofim', email: 'sofia@example.com', password: 'hashedpassword6', active: true, role: 'ADMIN' },
      { name: 'Luis', lastname: 'Sánchez', username: 'luiss', email: 'luis@example.com', password: 'hashedpassword7', active: true, role: 'USER' },
      { name: 'Elena', lastname: 'Torres', username: 'elenat', email: 'elena@example.com', password: 'hashedpassword8', active: true, role: 'PERSONAL' },
      { name: 'Fernando', lastname: 'Ruiz', username: 'fernr', email: 'fernando@example.com', password: 'hashedpassword9', active: true, role: 'USER' },
      { name: 'Gabriela', lastname: 'Díaz', username: 'gabyd', email: 'gabriela@example.com', password: 'hashedpassword10', active: true, role: 'ADMIN' },
    ],
  });

  console.log('Usuarios insertados');

  // Insertar Gates
  const gates = await prisma.gate.createMany({
    data: [
      { name: 'A1' }, { name: 'A2' }, { name: 'B1' }, { name: 'B2' }, { name: 'C1' },
      { name: 'C2' }, { name: 'D1' }, { name: 'D2' }, { name: 'E1' }, { name: 'E2' },
    ],
  });

  console.log('Puertas de embarque insertadas');

  // Insertar Flights
  const flights = await prisma.flight.createMany({
    data: [
      { origin: 'New York', destination: 'Los Angeles', departure: new Date('2025-03-01T08:00:00Z'), arrival: new Date('2025-03-01T11:00:00Z'), price: 350.50, status: 'SCHEDULED', maxPassengers: 180, soldTickets: 75, GateId: 1 },
      { origin: 'Chicago', destination: 'Miami', departure: new Date('2025-03-02T10:00:00Z'), arrival: new Date('2025-03-02T13:00:00Z'), price: 200.00, status: 'AT_GATE', maxPassengers: 150, soldTickets: 100, GateId: 2 },
      { origin: 'Dallas', destination: 'Houston', departure: new Date('2025-03-03T12:00:00Z'), arrival: new Date('2025-03-03T13:30:00Z'), price: 120.75, status: 'LANDED', maxPassengers: 100, soldTickets: 90, GateId: 3 },
      { origin: 'Boston', destination: 'San Francisco', departure: new Date('2025-03-04T15:00:00Z'), arrival: new Date('2025-03-04T18:30:00Z'), price: 400.00, status: 'SCHEDULED', maxPassengers: 200, soldTickets: 150, GateId: 4 },
      { origin: 'Seattle', destination: 'Denver', departure: new Date('2025-03-05T07:00:00Z'), arrival: new Date('2025-03-05T09:00:00Z'), price: 180.25, status: 'AT_GATE', maxPassengers: 160, soldTickets: 80, GateId: 5 },
    ],
  });

  console.log('Vuelos insertados');

  // Insertar Tickets
  const tickets = await prisma.ticket.createMany({
    data: [
      { status: 'SOLD', type: 'ECONOMY', flightId: 1, userId: 1 },
      { status: 'SOLD', type: 'BUSINESS', flightId: 2, userId: 2 },
      { status: 'SOLD', type: 'FIRST_CLASS', flightId: 3, userId: 3 },
      { status: 'SOLD', type: 'ECONOMY', flightId: 4, userId: 4 },
      { status: 'SOLD', type: 'BUSINESS', flightId: 5, userId: 5 },
      { status: 'SOLD', type: 'FIRST_CLASS', flightId: 1, userId: 6 },
      { status: 'SOLD', type: 'ECONOMY', flightId: 2, userId: 7 },
      { status: 'SOLD', type: 'BUSINESS', flightId: 3, userId: 8 },
      { status: 'SOLD', type: 'FIRST_CLASS', flightId: 4, userId: 9 },
      { status: 'SOLD', type: 'ECONOMY', flightId: 5, userId: 10 },
    ],
  });

  console.log('Tickets insertados');

  // Insertar Payments
  const payments = await prisma.payment.createMany({
    data: [
      { amount: 350.50, date: new Date('2025-03-01T09:00:00Z'), type: 'CASH', userId: 1, ticketId: 1 },
      { amount: 200.00, date: new Date('2025-03-02T11:00:00Z'), type: 'CREDIT_CARD', userId: 2, ticketId: 2 },
      { amount: 120.75, date: new Date('2025-03-03T13:00:00Z'), type: 'DEBIT_CARD', userId: 3, ticketId: 3 },
      { amount: 400.00, date: new Date('2025-03-04T16:00:00Z'), type: 'CASH', userId: 4, ticketId: 4 },
      { amount: 180.25, date: new Date('2025-03-05T08:00:00Z'), type: 'CREDIT_CARD', userId: 5, ticketId: 5 },
      { amount: 220.90, date: new Date('2025-03-06T15:00:00Z'), type: 'DEBIT_CARD', userId: 6, ticketId: 6 },
      { amount: 95.50, date: new Date('2025-03-07T10:00:00Z'), type: 'CASH', userId: 7, ticketId: 7 },
      { amount: 160.30, date: new Date('2025-03-08T12:00:00Z'), type: 'CREDIT_CARD', userId: 8, ticketId: 8 },
      { amount: 175.75, date: new Date('2025-03-09T17:00:00Z'), type: 'DEBIT_CARD', userId: 9, ticketId: 9 },
      { amount: 155.00, date: new Date('2025-03-10T18:00:00Z'), type: 'CASH', userId: 10, ticketId: 10 },
    ],
  });

  console.log('Pagos insertados');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
