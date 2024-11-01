import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from '../../../shared';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jw-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

/**
 * Custom decorator that sets the required roles for accessing a route.
 *
 * @param roles - List of roles that are allowed to access the route.
 * @returns CustomDecorator - Returns a metadata decorator to apply the required roles to a route.
 */
export const HasRoles = (...roles: UserRole[]) => SetMetadata('roles', roles);

/**
 * Combines the functionality of the HasRoles decorator and the authentication guard.
 *
 * This function decorates the route with required roles and enforces authentication through guards.
 *
 * @param  roles - The roles that are allowed to access the route.
 * @returns Returns a function that applies both role-based access and authentication guards.
 */
export function AuthRoles(...roles: UserRole[]) {
    return applyDecorators(
        ...(roles.length
                ? [
                    ApiBearerAuth(),
                    HasRoles(...roles),
                    UseGuards(JwtAuthGuard, RolesGuard)
                ]
                : []
        ),
    );
}
