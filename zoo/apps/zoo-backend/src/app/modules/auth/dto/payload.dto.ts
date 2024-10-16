import { ApiProperty } from '@nestjs/swagger';

export class JwtPayloadDto {
    @ApiProperty({
        example: 'user123',
        description: 'The login name of the user',
    })
    public readonly login: string;

    @ApiProperty({
        example: '60d21b4667d0d8992e610c85',
        description: 'The ID of the associated zoo (if applicable)',
    })
    public readonly zooId: string;
}
