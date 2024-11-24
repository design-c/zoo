import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal, AnimalSchema } from './animal.entity';
import { AnimalService } from './animal.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Animal.name, schema: AnimalSchema }]),
    ],
    providers: [
        AnimalService
    ],
    exports: [
        AnimalService
    ]
})
export class SharedAnimalModule {
}
