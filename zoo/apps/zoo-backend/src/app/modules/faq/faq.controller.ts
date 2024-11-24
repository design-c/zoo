import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUpdateFaqDto } from './dto/create-update-faq.dto';
import { AuthRoles } from '../auth/guards';
import { FAQ, FAQService, UserRole } from '../../shared';
import { Types } from 'mongoose';


@ApiTags('FAQ')
@Controller('zoo/faq')
@AuthRoles(UserRole.admin)
export class FAQController {
    constructor(private readonly _faqService: FAQService) {
    }

    @Get(':zooId/list')
    @AuthRoles(UserRole.user)
    @ApiParam({ name: 'zooId', description: 'ID зоопарка', type: String })
    @ApiOperation({ summary: 'Получить все вопросы и ответы' })
    @ApiResponse({ status: 200, description: 'Список всех FAQ.', type: FAQ, isArray: true })
    async getAllFAQs(@Param('zooId') zooId: Types.ObjectId) {
        return await this._faqService.findAll({ zooId });
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'ID faq', type: String })
    @ApiOperation({ summary: 'Получить вопрос по ID' })
    @ApiResponse({ status: 200, description: 'FAQ найдено.', type: FAQ })
    @ApiResponse({ status: 404, description: 'FAQ не найдено.' })
    async getFAQById(@Param('id') id: Types.ObjectId) {
        return await this._faqService.findById(id);
    }

    @Post(':id')
    @HttpCode(201)
    @ApiParam({ name: 'id', description: 'ID зоопарка', type: String })
    @ApiOperation({ summary: 'Создать новый вопрос' })
    @ApiBody({ type: CreateUpdateFaqDto })
    @ApiResponse({ status: 201, description: 'FAQ создано.', type: FAQ })
    async createFAQ(@Param('id') zooId: Types.ObjectId, @Body() createFAQDto: CreateUpdateFaqDto) {
        return await this._faqService.create({ ...createFAQDto, zooId });
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить существующий вопрос' })
    @ApiParam({ name: 'id', description: 'ID faq', type: String })
    @ApiBody({ type: CreateUpdateFaqDto })
    @ApiResponse({ status: 200, description: 'FAQ обновлено.', type: FAQ })
    @ApiResponse({ status: 404, description: 'FAQ не найдено.' })
    async updateFAQ(@Param('id') id: Types.ObjectId, @Body() updateFAQDto: CreateUpdateFaqDto) {
        return await this._faqService.update(id, updateFAQDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Удалить вопрос' })
    @ApiParam({ name: 'id', description: 'ID faq', type: String })
    @ApiResponse({ status: 204, description: 'FAQ удалено.' })
    @ApiResponse({ status: 404, description: 'FAQ не найдено.' })
    async deleteFAQ(@Param('id') id: Types.ObjectId) {
        await this._faqService.delete(id)
    }
}
