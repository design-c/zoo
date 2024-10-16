import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty({
        example: 'user123',
        description: 'The login name of the user',
    })
    public readonly login: string;

    @ApiProperty({
        example: 'password123',
        description: 'The password of the user',
    })
    public readonly password: string;
}
