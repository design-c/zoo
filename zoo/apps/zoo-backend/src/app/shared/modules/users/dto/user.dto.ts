import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UserDto {
    @ApiProperty({
        example: 'user123',
        description: 'The login name of the user',
    })
    public readonly login: string;

    @ApiProperty({
        example: 'password123',
        description: 'The user’s password',
    })
    public readonly password: string;

    public readonly zooId: Types.ObjectId = new Types.ObjectId();
}
