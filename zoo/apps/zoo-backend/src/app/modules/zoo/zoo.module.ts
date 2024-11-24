import { Module } from '@nestjs/common';
import { ZooController } from './zoo.controller';
import { FileStorageModule, SharedZooModule } from '../../shared';

@Module({
    imports: [
        FileStorageModule,
        SharedZooModule,
    ],
    controllers: [
        ZooController
    ],
})
export class ZooModule {}
