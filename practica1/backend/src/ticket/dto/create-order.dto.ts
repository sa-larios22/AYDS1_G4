import { ArrayMinSize, IsArray, IsNumber, IsPositive, ValidateNested } from "class-validator";
import { OrderDetailDto } from "./order-detail.dto";
import { Type } from "class-transformer";

export class CreateOrderDto {

    @IsNumber()
    @IsPositive()
    userId: number;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => OrderDetailDto) 
    orderDetails: OrderDetailDto[];
}