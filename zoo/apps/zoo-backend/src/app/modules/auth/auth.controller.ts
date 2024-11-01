import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../../shared';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginStatusDto, RegistrationStatusDto } from './dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly _authService: AuthService,
    ) {}

    @Post('register')
    @ApiOperation({ summary: 'User Registration' })
    @ApiResponse({
        status: 201,
        description: 'User successfully registered',
        type: RegistrationStatusDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
    })
    public async register(
        @Body() createUserDto: CreateUserDto,
    ): Promise<RegistrationStatusDto> {
        const result: RegistrationStatusDto = await this._authService.register(createUserDto);

        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }

        return result;
    }

    @Post('login')
    @ApiOperation({ summary: 'User Login' })
    @ApiResponse({
        status: 200,
        description: 'User successfully logged in',
        type: LoginStatusDto,
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
    })
    public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatusDto> {
        return await this._authService.login(loginUserDto);
    }
}
