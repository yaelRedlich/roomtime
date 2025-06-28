import { SetMetadata } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Role = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);



export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const OwnerOrAdmin = () => SetMetadata('ownerOrAdmin', true);

