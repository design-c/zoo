import { Module } from '@nestjs/common';
import { AnimalController } from './animal.controller';
import { SharedAnimalModule } from '../../shared';

@Module({
    imports: [
        SharedAnimalModule
    ],
    controllers: [
        AnimalController
    ],
})
export class AnimalModule {
}
