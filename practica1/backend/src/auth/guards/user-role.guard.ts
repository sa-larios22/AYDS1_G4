import { Reflector } from '@nestjs/core';
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { User } from '../interfaces';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get( META_ROLES, context.getHandler() );

    if ( !validRoles ) {
      return true;
    }

    if ( validRoles.length === 0 ) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if( !user ) {
      throw new BadRequestException('User not found');
    }

    if ( validRoles.includes(user.role) ) {
      return true;
    }

    throw new ForbiddenException(`User ${ user.username } need a valid role [ ${ validRoles.join(', ') } ]`);
  }
}