import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal, AnimalSchema } from './animal.entity';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Animal.name, schema: AnimalSchema }]),
    ],
    controllers: [AnimalController],
    providers: [AnimalService],
})
export class AnimalModule {
}
