import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/users/entities/role.enum';

/**
 * 
 * @param roles 
 * decorator to set which users have access to the resource
 * @returns 
 */
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);