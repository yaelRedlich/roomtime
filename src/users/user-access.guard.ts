import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ConflictException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  
  @Injectable()
  export class UserAccessGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const targetUserId = request.params.id;
  
      if (!user) {
        throw new ConflictException('User not authenticated');
      }
  
      const isAdmin = user.role === 'admin';
      const isOwner = user.userId === targetUserId;
  
      if (!isAdmin && !isOwner) {
        throw new ConflictException('You are not authorized to view this user');
      }
  
      return true;
    }
  }
  