import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoService } from '../../services';
import { ZooNewsItem } from './zoo-news.entity';


@Injectable()
export class ZooNewsService extends MongoService<ZooNewsItem> {
    constructor(@InjectModel(ZooNewsItem.name) protected readonly model: Model<ZooNewsItem>) {
        super(model);
    }
}
