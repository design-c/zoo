import { ApiProperty } from '@nestjs/swagger';
import { AccessTokenDto } from './access-token.dto';

export class LoginStatusDto extends AccessTokenDto {
    @ApiProperty({
        example: 'user123',
        description: 'The login name of the user',
    })
    public readonly login: string;
}
