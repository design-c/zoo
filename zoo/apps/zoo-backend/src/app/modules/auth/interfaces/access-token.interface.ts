import { Types } from 'mongoose';

export interface AccessTokenInterface {
    readonly login: string;
    readonly zooId?: Types.ObjectId;
    readonly _id: Types.ObjectId;
}
