import { Module } from '@nestjs/common';
import { FAQController } from './faq.controller';
import { FAQService } from './faq.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FAQ, FAQSchema } from './faq.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: FAQ.name, schema: FAQSchema }])
    ],
    controllers: [
        FAQController
    ],
    providers: [
        FAQService
    ]
})
export class FaqModule {}
