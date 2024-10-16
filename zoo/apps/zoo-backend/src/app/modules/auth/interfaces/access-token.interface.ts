import { Types } from 'mongoose';

export interface AccessTokenInterface {
    readonly login: string;
    readonly zooId?: Types.ObjectId;
    readonly id: Types.ObjectId;
}
