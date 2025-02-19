import {
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Status } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateFlightDto {
  @IsString()
  origin: string;

  @IsString()
  destination: string;

  @IsDate()
  @Type(() => Date)
  departure: Date;

  @IsDate()
  @Type(() => Date)
  arrival: Date;

  @IsNumber()
  price: number;

  @IsEnum(Status)
  status: Status;

  @IsNumber()
  maxPassengers: number;

  @IsNumber()
  soldTickets: number;

  @IsOptional()
  @IsNumber()
  GateId?: number;
}
