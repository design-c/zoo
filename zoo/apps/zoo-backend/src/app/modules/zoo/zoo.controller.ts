import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ZooService } from './services';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUpdateZooDto } from './dto';
import { Zoo } from './entities/zoo.entity';
import { AuthRoles } from '../auth/guards';
import { FileStorageService, LimitQueryDto, UserQueryDto, UserRole } from '../../shared';
import { Types } from 'mongoose';

@ApiTags('Zoo')
@Controller('zoo')
@AuthRoles(UserRole.admin)
export class ZooController {
    constructor(
        private readonly _zooService: ZooService,
        private readonly _storageService: FileStorageService
    ) {
    }

    @Get()
    @AuthRoles(UserRole.user)
    @ApiOperation({ summary: 'Получить список зоопарков' })
    @ApiResponse({ status: 200, description: 'Список зоопарков', isArray: true, type: Zoo })
    async getZoos(@Query() filterDto: LimitQueryDto) {
        return this._zooService.findAll({ ...filterDto });
    }

    @Get(':id')
    @AuthRoles(UserRole.user)
    @ApiOperation({ summary: 'Получить зоопарк по ID' })
    @ApiParam({ name: 'id', description: 'ID зоопарка', type: String })
    @ApiResponse({ status: 200, description: 'Зоопарк найден.', type: Zoo })
    @ApiResponse({ status: 404, description: 'Зоопарк не найден.' })
    async getZooById(@Param('id') id: Types.ObjectId) {
        return await this._zooService.findById(id);
    }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Создать информацию о зоопарке' })
    @ApiBody({ type: CreateUpdateZooDto })
    @ApiResponse({ status: 201, description: 'Зоопарк создан.', type: Zoo })
    async createZoo(@Body() createZooDto: CreateUpdateZooDto) {
        return await this._zooService.create(createZooDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить информацию о зоопарке' })
    @ApiParam({ name: 'id', description: 'ID зоопарка', type: String })
    @ApiBody({ type: CreateUpdateZooDto })
    @ApiResponse({ status: 200, description: 'Зоопарк обновлен.', type: Zoo })
    @ApiResponse({ status: 404, description: 'Зоопарк не найден.' })
    async updateZoo(@Param('id') id: Types.ObjectId, @Body() updateZooDto: CreateUpdateZooDto) {
        return await this._zooService.update(id, updateZooDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Удалить информацию о зоопарке' })
    @ApiParam({ name: 'id', description: 'ID зоопарка', type: String })
    @ApiResponse({ status: 204, description: 'Зоопарк удален.' })
    @ApiResponse({ status: 404, description: 'Зоопарк не найден.' })
    async deleteZoo(@Param('id') id: Types.ObjectId) {
        await this._zooService.delete(id);
    }

    @Get(':id/photos')
    @AuthRoles(UserRole.user)
    @ApiOperation({ summary: 'Получить фотографии зоопарка' })
    @ApiParam({ name: 'id', description: 'ID зоопарка', type: String })
    @ApiResponse({ status: 200, description: 'Фото из зоопарка', isArray: true, type: String })
    @ApiResponse({ status: 404, description: 'Зоопарк не найден.' })
    async getPhotos(
        @Query() filterDto: LimitQueryDto = {},
        @Query() userDto: UserQueryDto = {},
        @Param('id') zooId: Types.ObjectId,
        @Req() req: { user: { id: Types.ObjectId } }
    ) {
        return (await this._storageService.findAll({
            ...filterDto, zooId, fields: ['_id'],
            userId: userDto.userId === 'my' ? req.user.id : userDto.userId
        })).map(v => v._id);
    }
}
