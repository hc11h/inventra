import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY, Role } from './roles.decorator';
import { PrismaService } from '../prisma.service';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req as Request & { user?: any };
    const user = req.user;
    if (!user) return false;

    if (user.isSuperAdmin) return true;

  
    const orgHeader = req.headers?.['x-org-id'];
    const organizationId = orgHeader ? parseInt(Array.isArray(orgHeader) ? orgHeader[0] : orgHeader) : undefined;
    if (!organizationId || Number.isNaN(organizationId)) return false;

    const membership = await this.prisma.client.userOrganizationMembership.findUnique({
      where: { userId_organizationId: { userId: user.userId, organizationId } },
    });
    if (!membership) return false;

    return requiredRoles.includes(membership.role as Role);
  }
}


