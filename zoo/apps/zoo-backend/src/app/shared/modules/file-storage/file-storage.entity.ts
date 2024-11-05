import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../entities';
import { Types } from 'mongoose';

export enum FileType {
    image = 'image',
    audio = 'audio',
}

@Schema()
export class FileStorage extends BaseEntity {
    @ApiProperty({ example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...', description: 'Контент вложения в Base64' })
    @Prop({ required: true })
    public readonly content: string;

    @ApiProperty({ example: 'image', description: 'Тип вложения', enum: FileType })
    @Prop({ required: true, enum: FileType })
    public readonly type: FileType;

    @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'ID зоопарка', type: String })
    @Prop({ type: Types.ObjectId, required: false })
    public readonly zooId: Types.ObjectId;
}

export const FileStorageSchema = SchemaFactory.createForClass(FileStorage);
