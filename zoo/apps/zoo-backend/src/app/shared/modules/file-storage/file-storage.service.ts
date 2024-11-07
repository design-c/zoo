import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileStorage } from './file-storage.entity';
import { MongoService } from '../../services';

@Injectable()
export class FileStorageService extends MongoService<FileStorage> {
    constructor(@InjectModel(FileStorage.name) protected readonly model: Model<FileStorage>) {
        super(model);
    }
}
