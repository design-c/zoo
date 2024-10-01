import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { FAQService } from './faq.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateFAQDto } from './dto/update-faq.dto';
import { CreateFAQDto } from './dto/create-faq.dto';
import { FAQ } from './faq.entity';


@ApiTags('FAQ')
@Controller('admin/faq')
export class FAQController {
    constructor(private readonly faqService: FAQService) {
    }

    @Get()
    @ApiOperation({ summary: 'Получить все вопросы и ответы' })
    @ApiResponse({ status: 200, description: 'Список всех FAQ.', type: FAQ, isArray: true })
    async getAllFAQs() {
        return await this.faqService.findAll();
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
    @ApiBody({ type: CreateFAQDto })
    @ApiResponse({ status: 201, description: 'FAQ создано.', type: FAQ })
    async createFAQ(@Body() createFAQDto: CreateFAQDto) {
        return await this.faqService.create(createFAQDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить существующий вопрос' })
    @ApiParam({ name: 'id', description: 'ID FAQ' })
    @ApiBody({ type: UpdateFAQDto })
    @ApiResponse({ status: 200, description: 'FAQ обновлено.', type: FAQ })
    @ApiResponse({ status: 404, description: 'FAQ не найдено.' })
    async updateFAQ(@Param('id') id: string, @Body() updateFAQDto: UpdateFAQDto) {
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
