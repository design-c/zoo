import { Module } from '@nestjs/common';
import { ZooController } from './zoo.controller';
import { ZooService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { Zoo, ZooSchema } from './entities/zoo.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Zoo.name, schema: ZooSchema }])
    ],
    controllers: [
        ZooController
    ],
    providers: [
        ZooService
    ]
})
export class ZooModule {}
