import { Module } from '@nestjs/common';
import { SharedZooNewsModule } from '../../shared';
import { ZooNewsController } from './zoo-news.controller';

@Module({
    imports: [
        SharedZooNewsModule,
    ],
    controllers: [
        ZooNewsController
    ]
})
export class ZooNewsModule {}
