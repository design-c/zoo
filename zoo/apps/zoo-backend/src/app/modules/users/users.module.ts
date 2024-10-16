import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './models';
import { UsersService } from './users.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema, }]),
    ],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {
}
