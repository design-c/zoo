import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileStorage, FileStorageSchema } from './file-storage.entity';
import { FileStorageService } from './file-storage.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: FileStorage.name, schema: FileStorageSchema }]),
    ],
    providers: [
        FileStorageService
    ],
    exports: [
        FileStorageService
    ]
})
export class FileStorageModule {
}
