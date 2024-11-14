import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthRoles } from '../auth/guards';
import { User, UserRole, UsersService } from '../../shared';

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
