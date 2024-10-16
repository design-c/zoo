import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './models';
import { Model } from 'mongoose';
import { compare, genSalt, hash } from 'bcrypt';
import { Service } from '../../services/base.service';

@Injectable()
export class UsersService extends Service<UserModel> {
    private readonly _saltRounds: number = 10;

    constructor(
        @InjectModel(UserModel.name) protected readonly model: Model<UserModel>
    ) {
        super(model);
    }

    /**
     * Finds a user based on the login field in the payload.
     *
     * @param {Object} param - The payload containing the login field.
     * @param {string} param.login - The login of the user to be found.
     * @returns {Promise<UserModel | null>} The user model if found, otherwise null.
     */
    async findByPayload({ login }: { login: string }): Promise<UserModel | null> {
        return await this.findOne({ login });
    }

    /**
     * Finds a user by their login and password for authentication.
     *
     * @param {LoginUserDto} param - The login credentials of the user.
     * @param {string} param.login - The login of the user.
     * @param {string} param.password - The password of the user.
     * @returns {Promise<UserModel>} The user model if authentication succeeds.
     * @throws {HttpException} If the user is not found or the credentials are invalid.
     */
    async findByLogin({ login, password }: LoginUserDto): Promise<UserModel> {
        const user = await this.findOne({ login });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        const areEqual = await compare(password, user.password);

        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    /**
     * Creates a new user in the system.
     *
     * @param {CreateUserDto} userDto - The data required to create a new user.
     * @returns {Promise<UserModel>} The newly created user model.
     * @throws {HttpException} If the user already exists in the database.
     */
    async createUser(userDto: CreateUserDto): Promise<UserModel> {
        const { login, password, role } = userDto;
        const userInDb = await this.findOne({ login });

        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const salt = await genSalt(this._saltRounds);
        const hashPassword = await hash(password, salt);
        const user: UserModel = new this.model({ login, role, password: hashPassword });

        await user.save();

        return user;
    }
}
