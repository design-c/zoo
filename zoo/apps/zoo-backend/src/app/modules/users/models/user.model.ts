import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '../../../entities/base.entity';
import { UserRole } from '../enums';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema()
export class UserModel extends BaseEntity {

    @ApiProperty({
        example: 'user123',
        description: 'The login name of the user',
        type: String,
    })
    @Prop({ required: true })
    public readonly login: string;

    @ApiProperty({
        example: 'password123',
        description: 'The password of the user, stored securely (hashed)',
        type: String,
    })
    @Prop({ required: true })
    public readonly password: string;

    @ApiProperty({
        example: UserRole.user,
        description: 'Role of the user in the system (Admin or User)',
        enum: UserRole,
        type: String,
    })
    @Prop({ required: true, enum: UserRole, type: String })
    public readonly role: UserRole;

    @ApiProperty({
        example: '60d21b4667d0d8992e610c85',
        description: 'ID of the zoo that the user is associated with (if applicable)',
        type: String,
        required: false,
    })
    @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId(), required: false })
    public readonly zooId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
