import { IsNumber, IsPositive } from "class-validator";

export class OrderDetailDto {

    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    ticketId: number;
}