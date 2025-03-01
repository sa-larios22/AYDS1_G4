import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class CreateAuthDto {

    @IsString()
    name: string;

    @IsString()
    lastname: string;

    @IsString()
    @MinLength(4)
    username: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsEnum(['ADMIN', 'USER', 'PERSONAL'])
    role: Role;

}
