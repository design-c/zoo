import { Module } from '@nestjs/common';
import { UsersModule } from '../../shared';
import { UserController } from './user.controller';

@Module({
    imports: [
        UsersModule
    ],
    controllers: [
        UserController
    ],
})
export class UserModule {
}
