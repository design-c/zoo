import { Module } from '@nestjs/common';
import { FAQController } from './faq.controller';
import { SharedFaqModule } from '../../shared';

@Module({
    imports: [
        SharedFaqModule,
    ],
    controllers: [
        FAQController
    ]
})
export class FaqModule {}
