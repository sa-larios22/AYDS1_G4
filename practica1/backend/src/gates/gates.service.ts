import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Gate } from '@prisma/client';
import { CreateGateDto } from './dto/create-gate.dto';
import { UpdateGateDto } from './dto/update-gate.dto';

@Injectable()
export class GatesService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('GatesService');

  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async findAll(): Promise<Gate[]> {
    return this.gate.findMany({
      include: { flights: true },
    });
  }

  async findOne(id: number): Promise<Gate | null> {
    const gate = await this.gate.findUnique({
      where: { id },
      include: { flights: true },
    });

    if (!gate) {
      this.logger.warn(`Gate with ID ${id} not found`);
      throw new NotFoundException(`Gate with ID ${id} not found`);
    }

    return gate;
  }

  async create(createGateDto: CreateGateDto): Promise<Gate> {
    return this.gate.create({ data: createGateDto });
  }

  async update(id: number, updateGateDto: UpdateGateDto): Promise<Gate> {
    return this.gate.update({
      where: { id },
      data: updateGateDto,
    });
  }

  async remove(id: number): Promise<Gate> {
    return this.gate.delete({ where: { id } });
  }
}