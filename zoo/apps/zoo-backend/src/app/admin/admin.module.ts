import { Module } from '@nestjs/common';
import { FaqModule } from './faq/faq.module';
import { AnimalModule } from './animal/animal.module';

@Module({
    imports: [
        FaqModule,
        AnimalModule
    ]
})
export class AdminModule {}
