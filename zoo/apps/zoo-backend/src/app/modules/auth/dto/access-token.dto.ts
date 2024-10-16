import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
    @ApiProperty({
        example: 3600,
        description: 'The expiration time of the access token in seconds',
    })
    public readonly expiresIn: number;

    @ApiProperty({
        example: 'jwt-token-example',
        description: 'The access token string',
    })
    public readonly accessToken: string;
}
