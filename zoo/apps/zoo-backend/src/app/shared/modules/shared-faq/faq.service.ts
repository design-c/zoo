import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FAQ } from './faq.entity';
import { MongoService } from '../../services';


@Injectable()
export class FAQService extends MongoService<FAQ> {
    constructor(@InjectModel(FAQ.name) protected readonly model: Model<FAQ>) {
        super(model);
    }
}
