import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRoles } from '../auth/guards';
import { UserRole, ZooNewsItem, ZooNewsService } from '../../shared';
import { Types } from 'mongoose';
import { CreateUpdateZooNewsItemDto } from './dto/create-update-zoo-news.dto';

@ApiTags('Zoo News')
@Controller('zoo/news')
@AuthRoles(UserRole.admin)
export class ZooNewsController {
    constructor(private readonly _zooNewsService: ZooNewsService) {}

    @Get(':zooId/list')
    @AuthRoles(UserRole.user)
    @ApiParam({ name: 'zooId', description: 'ID зоопарка', type: String })
    @ApiOperation({ summary: 'Получить все новости для зоопарка' })
    @ApiResponse({ status: 200, description: 'Список всех новостей.', type: ZooNewsItem, isArray: true })
    async getAllNews(@Param('zooId') zooId: Types.ObjectId) {
        return await this._zooNewsService.findAll({ zooId });
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'ID новости', type: String })
    @ApiOperation({ summary: 'Получить новость по ID' })
    @ApiResponse({ status: 200, description: 'Новость найдена.', type: ZooNewsItem })
    @ApiResponse({ status: 404, description: 'Новость не найдена.' })
    async getNewsById(@Param('id') id: Types.ObjectId) {
        return await this._zooNewsService.findById(id);
    }

    @Post(':zooId')
    @HttpCode(201)
    @ApiParam({ name: 'zooId', description: 'ID зоопарка', type: String })
    @ApiOperation({ summary: 'Создать новость для зоопарка' })
    @ApiBody({ type: CreateUpdateZooNewsItemDto })
    @ApiResponse({ status: 201, description: 'Новость создана.', type: ZooNewsItem })
    async createNews(@Param('zooId') zooId: Types.ObjectId, @Body() createNewsDto: CreateUpdateZooNewsItemDto) {
        return await this._zooNewsService.create({ ...createNewsDto, zooId });
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить новость' })
    @ApiParam({ name: 'id', description: 'ID новости', type: String })
    @ApiBody({ type: CreateUpdateZooNewsItemDto })
    @ApiResponse({ status: 200, description: 'Новость обновлена.', type: ZooNewsItem })
    @ApiResponse({ status: 404, description: 'Новость не найдена.' })
    async updateNews(@Param('id') id: Types.ObjectId, @Body() updateNewsDto: CreateUpdateZooNewsItemDto) {
        return await this._zooNewsService.update(id, updateNewsDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Удалить новость' })
    @ApiParam({ name: 'id', description: 'ID новости', type: String })
    @ApiResponse({ status: 204, description: 'Новость удалена.' })
    @ApiResponse({ status: 404, description: 'Новость не найдена.' })
    async deleteNews(@Param('id') id: Types.ObjectId) {
        await this._zooNewsService.delete(id);
    }
}
