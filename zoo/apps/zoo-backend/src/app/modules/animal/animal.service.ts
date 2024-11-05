import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from './animal.entity';
import { MongoService } from '../../shared';

@Injectable()
export class AnimalService extends MongoService<Animal> {
    constructor(@InjectModel(Animal.name) protected readonly animalModel: Model<Animal>) {
        super(animalModel);
    }
}
