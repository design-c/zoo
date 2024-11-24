import { Module } from '@nestjs/common';
import { FAQService } from './faq.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FAQ, FAQSchema } from './faq.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: FAQ.name, schema: FAQSchema }])
    ],
    providers: [
        FAQService
    ],
    exports: [
        FAQService
    ]
})
export class SharedFaqModule {}
