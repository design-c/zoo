import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoService } from '../../services';
import { Zoo } from './zoo.entity';


@Injectable()
export class ZooService extends MongoService<Zoo> {
    constructor(@InjectModel(Zoo.name) protected readonly model: Model<Zoo>) {
        super(model);
    }
}
