import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRoles } from '../auth/guards';
import { User, UserRole, UsersService } from '../../shared';
import { FAQ } from '../faq/faq.entity';
import { Types } from 'mongoose';

@ApiTags('User')
@Controller('user')
@AuthRoles(UserRole.user)
export class UserController {
    constructor(private readonly usersService: UsersService) {}

//
//    @ApiOperation({ summary: 'Получить текущего пользователя' })
//    @ApiResponse({ status: 200, description: 'FAQ найдено.', type: User })
//    @ApiResponse({ status: 404, description: 'FAQ не найдено.' })
//    async getFAQById(@Param('zooId') zooId: Types.ObjectId) {
//        return await this.faqService.findById(id);
//    }
}
