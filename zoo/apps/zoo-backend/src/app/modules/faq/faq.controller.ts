import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { FAQService } from './faq.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUpdateFaqDto } from './dto/create-update-faq.dto';
import { FAQ } from './faq.entity';
import { AuthRoles } from '../auth/guards';
import { UserRole } from '../../shared';
import { Types } from 'mongoose';


@ApiTags('FAQ', )
@Controller('zoo/:zooId/faq')
@AuthRoles(UserRole.admin)
export class FAQController {
    constructor(private readonly _faqService: FAQService) {
    }

    @Get()
    @AuthRoles(UserRole.user)
    @ApiOperation({ summary: 'Получить все вопросы и ответы' })
    @ApiResponse({ status: 200, description: 'Список всех FAQ.', type: FAQ, isArray: true })
    async getAllFAQs(@Param('zooId') zooId: string) {
        return await this._faqService.findAll({ zooId });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить вопрос по ID' })
    @ApiResponse({ status: 200, description: 'FAQ найдено.', type: FAQ })
    @ApiResponse({ status: 404, description: 'FAQ не найдено.' })
    async getFAQById(@Param('zooId') zooId: Types.ObjectId, @Param('id') id: string) {
        return await this._faqService.findById(id);
    }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Создать новый вопрос' })
    @ApiBody({ type: CreateUpdateFaqDto })
    @ApiResponse({ status: 201, description: 'FAQ создано.', type: FAQ })
    async createFAQ(@Param('zooId') zooId: Types.ObjectId, @Body() createFAQDto: CreateUpdateFaqDto) {
        return await this._faqService.create({ ...createFAQDto, zooId });
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить существующий вопрос' })
    @ApiBody({ type: CreateUpdateFaqDto })
    @ApiResponse({ status: 200, description: 'FAQ обновлено.', type: FAQ })
    @ApiResponse({ status: 404, description: 'FAQ не найдено.' })
    async updateFAQ(@Param('zooId') zooId: Types.ObjectId, @Param('id') id: string, @Body() updateFAQDto: CreateUpdateFaqDto) {
        return await this._faqService.update(id, updateFAQDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Удалить вопрос' })
    @ApiResponse({ status: 204, description: 'FAQ удалено.' })
    @ApiResponse({ status: 404, description: 'FAQ не найдено.' })
    async deleteFAQ(@Param('zooId') zooId: Types.ObjectId, @Param('id') id: string) {
        await this._faqService.delete(id)
    }
}
