import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Zoo } from '../entities/zoo.entity';
import { MongoService } from '../../../shared';

@Injectable()
export class ZooService extends MongoService<Zoo> {
    constructor(@InjectModel(Zoo.name) protected readonly model: Model<Zoo>) {
        super(model);
    }
}
