import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGateDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}