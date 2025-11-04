import { SetMetadata } from '@nestjs/common';

export type Role = 'ORG_ADMIN' | 'ORG_MANAGER' | 'ORG_STAFF';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);


