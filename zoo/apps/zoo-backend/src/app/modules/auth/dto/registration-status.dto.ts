import { ApiProperty } from '@nestjs/swagger';

export class RegistrationStatusDto {
    @ApiProperty({
        example: true,
        description: 'Indicates whether the registration was successful',
    })
    success: boolean;

    @ApiProperty({
        example: 'User successfully registered',
        description: 'Message related to the registration process',
    })
    message: string;
}
