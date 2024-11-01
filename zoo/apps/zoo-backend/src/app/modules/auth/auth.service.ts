import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UserDto, User, UsersService } from '../../shared';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IConfiguration, IJwtConfig } from '../../config/configuration';
import { AccessTokenDto, JwtPayloadDto, LoginStatusDto, RegistrationStatusDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly _usersService: UsersService,
        private readonly _jwtService: JwtService,
        private readonly _configService: ConfigService<IConfiguration>
    ) {
    }

    /**
     * Registers a new user by creating the user and generating a JWT token for them.
     * @param userDto - Data Transfer Object containing user details for registration
     * @returns RegistrationStatus - A promise that resolves to the registration status
     */
    public async register(userDto: CreateUserDto): Promise<RegistrationStatusDto> {
        const status: RegistrationStatusDto = { success: true, message: 'user registered' };

        try {
            const user = await this._usersService.createUser(userDto);
            const token = this._createToken(user);

            return { ...status, ...token };
        }
        catch (err) {
            return { success: false, message: err };
        }
    }

    /**
     * Logs in a user by validating their credentials and returning a JWT token.
     * @param loginUserDto - Data Transfer Object containing login credentials
     * @returns ILoginStatus - A promise that resolves to the login status and JWT token
     */
    public async login(loginUserDto: LoginUserDto): Promise<LoginStatusDto> {
        const user = await this._usersService.findByLogin(loginUserDto);
        const token = this._createToken(user);

        return { login: user.login, ...token };
    }

    /**
     * Validates the user by checking the JWT payload. Throws an exception if the token is invalid.
     * @param payload - JWT payload containing user login information
     * @returns {Promise<UserDto>} - A promise that resolves to the user details if the token is valid
     * @throws HttpException if the token is invalid
     */
    public async validateUser(payload: JwtPayloadDto): Promise<UserDto> {
        const user = await this._usersService.findByPayload(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    /**
     * Generates a JWT token for a user.
     * @param user - Data Transfer Object containing user login information
     * @returns IAccessToken - Object containing the access token and its expiration time
     */
    private _createToken({ login, zooId, _id }: User): AccessTokenDto {
        const expiresIn = this._configService.get<IJwtConfig>('jwt').expiresIn;
        const accessToken = this._jwtService.sign({ login, zooId, id: _id });

        return { expiresIn, accessToken };
    }
}
