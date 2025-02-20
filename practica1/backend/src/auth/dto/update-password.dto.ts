import { IsStrongPassword } from 'class-validator';

export class UpadtePasswordDto {

    @IsStrongPassword()
    password: string;

}
