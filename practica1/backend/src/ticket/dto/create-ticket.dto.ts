import { TicketType } from "@prisma/client";
import { IsEnum, IsNumber, IsPositive } from "class-validator";

export class CreateTicketDto {

    @IsEnum(['ECONOMY', 'BUSINESS', 'FIRST_CLASS'])
    type: TicketType;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    totalSeats: number;

    @IsNumber()
    @IsPositive()
    flightId: number;

    @IsNumber()
    @IsPositive()
    userId: number;

}
