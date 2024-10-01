import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from '../../services/base.service';
import { FAQ } from './faq.entity';


@Injectable()
export class FAQService extends Service<FAQ> {
    constructor(@InjectModel(FAQ.name) protected readonly faqModel: Model<FAQ>) {
        super(faqModel);
    }
}
