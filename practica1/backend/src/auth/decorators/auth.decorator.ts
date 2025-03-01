
import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { RoleProtected } from './role-protected.decorator';
import { Role } from '../interfaces';
import { UserRoleGuard } from '../guards/user-role.guard';

export const Auth = (...roles: Role[]) => {

    return applyDecorators(
        RoleProtected(...roles),
        UseGuards( AuthGuard(), UserRoleGuard )
    );

}