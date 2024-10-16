import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { FAQService } from './faq.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUpdateFaqDto } from './dto/create-update-faq.dto';
import { FAQ } from './faq.entity';
import { AuthRoles } from '../auth/guards';
import { UserRole } from '../users';


@ApiTags('FAQ', )
@Controller('zoo/faq')
@AuthRoles(UserRole.admin)
export class FAQController {
    constructor(private readonly faqService: FAQService) {
    }

    @Get()
    @AuthRoles(UserRole.user)
    @ApiOperation({ summary: 'Получить все вопросы и ответы' })
    @ApiResponse({ status: 200, description: 'Список всех FAQ.', type: FAQ, isArray: true })
    @ApiQuery({ name: 'zooId', required: true, description: 'ID зоопарка для фильтрации вопросов' })
    async getAllFAQs(@Query('zooId') zooId: string) {
        return await this.faqService.findAll(zooId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить вопрос по ID' })
    @ApiParam({ name: 'id', description: 'ID FAQ' })
    @ApiResponse({ status: 200, description: 'FAQ найдено.', type: FAQ })
    @ApiResponse({ status: 404, description: 'FAQ не найдено.' })
    async getFAQById(@Param('id') id: string) {
        return await this.faqService.findById(id);
    }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Создать новый вопрос' })
    @ApiBody({ type: CreateUpdateFaqDto })
    @ApiResponse({ status: 201, description: 'FAQ создано.', type: FAQ })
    async createFAQ(@Body() createFAQDto: CreateUpdateFaqDto) {
        return await this.faqService.create(createFAQDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить существующий вопрос' })
    @ApiParam({ name: 'id', description: 'ID FAQ' })
    @ApiBody({ type: CreateUpdateFaqDto })
    @ApiResponse({ status: 200, description: 'FAQ обновлено.', type: FAQ })
    @ApiResponse({ status: 404, description: 'FAQ не найдено.' })
    async updateFAQ(@Param('id') id: string, @Body() updateFAQDto: CreateUpdateFaqDto) {
        return await this.faqService.update(id, updateFAQDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Удалить вопрос' })
    @ApiParam({ name: 'id', description: 'ID FAQ' })
    @ApiResponse({ status: 204, description: 'FAQ удалено.' })
    @ApiResponse({ status: 404, description: 'FAQ не найдено.' })
    async deleteFAQ(@Param('id') id: string) {
        await this.faqService.delete(id)
    }
}
