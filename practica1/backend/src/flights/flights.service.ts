import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient, Flight } from '@prisma/client';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

@Injectable()
export class FlightsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('FlightsService');

  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  // Find all flights
  async findAll(): Promise<Flight[]> {
    return this.flight.findMany({
      include: { gate: true, tickets: true },
    });
  }

  // Find a flight by ID
  async findOne(id: number): Promise<Flight | null> {
    const flight = await this.flight.findUnique({
      where: { id },
      include: { gate: true, tickets: true },
    });

    if (!flight) {
      this.logger.warn(`Flight with ID ${id} not found`);
      throw new NotFoundException(`Flight with ID ${id} not found`);
    }

    return flight;
  }

  // Create a flight
  async create(data: CreateFlightDto): Promise<Flight> {
    return this.flight.create({ data });
  }

  // Update a flight
  async update(id: number, data: UpdateFlightDto): Promise<Flight> {
    return this.flight.update({
      where: { id },
      data,
    });
  }

  // Remove a flight
  async remove(id: number): Promise<Flight> {
    return this.flight.delete({ where: { id } });
  }

  // Assign a gate to a flight
  async assignGate(flightId: number, gateId: number): Promise<Flight> {
    const flight = await this.flight.findUnique({ where: { id: flightId } });

    if (!flight) {
      this.logger.warn(`Flight with ID ${flightId} not found`);
      throw new NotFoundException(`Flight with ID ${flightId} not found`);
    }

    const gate = await this.gate.findUnique({ where: { id: gateId } });

    if (!gate) {
      this.logger.warn(`Gate with ID ${gateId} not found`);
      throw new NotFoundException(`Gate with ID ${gateId} not found`);
    }

    return this.flight.update({
      where: { id: flightId },
      data: { GateId: gateId },
      include: { gate: true },
    });
  }
}
