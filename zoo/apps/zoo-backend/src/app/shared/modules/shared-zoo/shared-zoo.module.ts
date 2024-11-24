import { Module } from '@nestjs/common';
import { ZooService } from './zoo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Zoo, ZooSchema } from './zoo.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Zoo.name, schema: ZooSchema }])
    ],
    providers: [
        ZooService
    ],
    exports: [
        ZooService
    ]
})
export class SharedZooModule {
}
