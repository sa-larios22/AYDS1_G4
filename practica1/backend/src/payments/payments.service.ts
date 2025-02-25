import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Payment } from '@prisma/client';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('PaymentsService');

  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async findAll(): Promise<Payment[]> {
    return this.payment.findMany({
      include: { order: true },
    });
  }

  async findOne(id: number): Promise<Payment | null> {
    const payment = await this.payment.findUnique({
      where: { id },
      include: { order: true },
    });

    if (!payment) {
      this.logger.warn(`Payment with ID ${id} not found`);
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.payment.create({
      data: createPaymentDto,
      include: { order: true },
    });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    return this.payment.update({
      where: { id },
      data: updatePaymentDto,
      include: { order: true },
    });
  }

  async remove(id: number): Promise<Payment> {
    return this.payment.delete({ where: { id } });
  }
}
