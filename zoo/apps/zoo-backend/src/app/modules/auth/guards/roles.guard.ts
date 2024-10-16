import { ROLE_RULES, UserRole } from '../../users';
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) {
    }

    /**
     * Method that determines whether the user has permission to access the requested route.
     *
     * @param {ExecutionContext} context - The context in which the guard is called (contains information about the request).
     * @returns {boolean} - Returns true if the user has the required role, false otherwise.
     */
    public canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this._reflector.getAllAndOverride<UserRole[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles || !requiredRoles.length) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();

        return requiredRoles.some(role => ROLE_RULES[user.role] >= ROLE_RULES[role]);
    }
}
