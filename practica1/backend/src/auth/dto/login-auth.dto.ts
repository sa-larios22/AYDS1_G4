import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class LoginAuthDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

}
