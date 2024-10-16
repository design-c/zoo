import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
    @ApiProperty({
        example: '60d21b4667d0d8992e610c85',
        description: 'ID of the zoo that the user is associated with (if applicable)',
        type: String
    })
    public readonly zooId: Types.ObjectId;
}
