import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileStorageModule } from '../../shared';

@Module({
    imports: [
        FileStorageModule
    ],
    controllers: [
        FileController
    ]
})

export class FileModule {
}
