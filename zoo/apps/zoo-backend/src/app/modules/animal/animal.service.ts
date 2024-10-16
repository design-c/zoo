import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from '../../services/base.service';
import { Animal } from './animal.entity';

@Injectable()
export class AnimalService extends Service<Animal> {
    constructor(@InjectModel(Animal.name) protected readonly animalModel: Model<Animal>) {
        super(animalModel);
    }
}
