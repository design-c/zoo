import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Zoo } from '../entities/zoo.entity';
import { Service } from '../../../services/base.service';

@Injectable()
export class ZooService extends Service<Zoo> {
    constructor(@InjectModel(Zoo.name) protected readonly model: Model<Zoo>) {
        super(model);
    }
}
