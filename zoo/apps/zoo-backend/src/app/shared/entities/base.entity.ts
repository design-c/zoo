import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ id: true, timestamps: true })
export class BaseEntity extends Document<Types.ObjectId> {
    @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'ID', type: String, name: 'id' })
    @Prop({ required: false, type: Types.ObjectId })
    public override readonly id: Types.ObjectId;

    @ApiProperty({ example: '2021-07-21T17:32:28Z', description: 'Дата создания' })
    createdAt?: Date;

    @ApiProperty({ example: '2021-07-21T17:32:28Z', description: 'Дата обновления' })
    updatedAt?: Date;
}
