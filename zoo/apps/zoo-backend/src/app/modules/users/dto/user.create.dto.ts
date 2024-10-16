import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums';

export class CreateUserDto {
    @ApiProperty({
        example: 'user123',
        description: 'The login name of the user',
    })
    public readonly login: string;

    @ApiProperty({
        example: 'password123',
        description: 'The password of the user, stored securely',
    })
    public readonly password: string;

    @ApiProperty({
        example: UserRole.user,
        description: 'Role of the user in the system',
        enum: UserRole,
    })
    public readonly role: UserRole;
}
