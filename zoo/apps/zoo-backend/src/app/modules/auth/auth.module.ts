import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { IConfiguration, IJwtConfig } from '../../config/configuration';

@Module({
    imports: [
        UsersModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.registerAsync({
            useFactory: (config: ConfigService<IConfiguration>) => {
                return {
                    secret: config.get<IJwtConfig>('jwt').secret,
                    signOptions: {
                        expiresIn: config.get<IJwtConfig>('jwt').expiresIn,
                    },
                };
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports: [
        PassportModule,
        JwtModule
    ],
})
export class AuthModule {
}
