import { IsEmail, IsEnum, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class CreateAuthDto {

    @IsString()
    @MinLength(4)
    username: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsStrongPassword()
    password: string;

    @IsEnum(['admin', 'user', 'personal'])
    role: string;

}
