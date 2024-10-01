import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';


export class BaseEntity extends Document {
    @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'ID', type: String })
    @Prop({ required: true })
    public readonly id: ObjectId;
}
