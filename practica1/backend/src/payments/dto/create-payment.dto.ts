import { IsNumber, IsEnum, IsDate } from 'class-validator';
import { PaymentType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsEnum(PaymentType)
  type: PaymentType;

  @IsNumber()
  orderId: number;
}
