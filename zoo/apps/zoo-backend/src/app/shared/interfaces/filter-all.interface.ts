import { Types } from 'mongoose';

export interface IFilterAll {
    zooId?: string | Types.ObjectId;
    limit?: number;
    offset?: number;
    sort?: 'asc' | 'desc';
    userId?: string | Types.ObjectId;
    fields?: string[]
}
