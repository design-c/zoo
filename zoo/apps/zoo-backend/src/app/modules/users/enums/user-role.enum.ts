export enum UserRole {
    user = 'user',
    admin = 'admin',
}

export const ROLE_RULES: Record<UserRole, number> = {
    [UserRole.admin]: 1,
    [UserRole.user]: 0,
}
