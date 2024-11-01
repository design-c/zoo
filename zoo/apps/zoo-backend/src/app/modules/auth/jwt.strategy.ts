import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfiguration, IJwtConfig } from '../../config/configuration';
import { JwtPayloadDto } from './dto';
import { UserDto } from '../../shared';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly _authService: AuthService,
        private readonly _config: ConfigService<IConfiguration>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _config.get<IJwtConfig>('jwt').secret,
        });
    }

    /**
     * Validates the JWT token payload and returns the user details.
     * @param payload - JWT payload containing the user's login
     * @returns UserDto - The user details if the token is valid
     * @throws HttpException - Throws if the token is invalid or the user cannot be found
     */
    async validate(payload: JwtPayloadDto): Promise<UserDto> {
        const user = await this._authService.validateUser(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}
