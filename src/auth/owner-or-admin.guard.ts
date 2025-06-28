import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const isProtected = this.reflector.get<boolean>('ownerOrAdmin', context.getHandler());
        if (!isProtected) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const paramId = request.params.id || request.body.ownerId || request.body.userId;

        if (user.role === 'admin') return true;

        if (user.userId === paramId) return true;

        return false
    }
}