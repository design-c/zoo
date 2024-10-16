import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ZooService } from './services';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUpdateZooDto, PhotoFilterDto } from './dto';
import { Zoo } from './entities/zoo.entity';
import { AuthRoles } from '../auth/guards';
import { UserRole } from '../users';

@ApiTags('Zoo')
@Controller('zoo')
@AuthRoles(UserRole.admin)
export class ZooController {
    constructor(private readonly zooService: ZooService) {}

    @Get()
    @ApiOperation({ summary: 'Получить информацию о зоопарке' })
    @ApiResponse({ status: 200, description: 'Информация о зоопарке.', type: Zoo })
    async getZoo() {
        return await this.zooService.findAll();
    }


    @Get(':id')
    @AuthRoles(UserRole.user)
    @ApiOperation({ summary: 'Получить зоопарк по ID' })
    @ApiParam({ name: 'id', description: 'ID зоопарка' })
    @ApiResponse({ status: 200, description: 'Зоопарк найден.', type: Zoo })
    @ApiResponse({ status: 404, description: 'Зоопарк не найден.' })
    async getZooById(@Param('id') id: string) {
        return await this.zooService.findById(id);
    }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Создать информацию о зоопарке' })
    @ApiBody({ type: CreateUpdateZooDto })
    @ApiResponse({ status: 201, description: 'Зоопарк создан.', type: Zoo })
    async createZoo(@Body() createZooDto: CreateUpdateZooDto) {
        return await this.zooService.create(createZooDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить информацию о зоопарке' })
    @ApiParam({ name: 'id', description: 'ID зоопарка' })
    @ApiBody({ type: CreateUpdateZooDto })
    @ApiResponse({ status: 200, description: 'Зоопарк обновлен.', type: Zoo })
    @ApiResponse({ status: 404, description: 'Зоопарк не найден.' })
    async updateZoo(@Param('id') id: string, @Body() updateZooDto: CreateUpdateZooDto) {
        return await this.zooService.update(id, updateZooDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Удалить информацию о зоопарке' })
    @ApiParam({ name: 'id', description: 'ID зоопарка' })
    @ApiResponse({ status: 204, description: 'Зоопарк удален.' })
    @ApiResponse({ status: 404, description: 'Зоопарк не найден.' })
    async deleteZoo(@Param('id') id: string) {
        await this.zooService.delete(id);
    }

    @Get('photos')
    @ApiResponse({ status: 200, description: 'Фото из зоопарка', isArray: true })
    async getPhotos(@Query() filterDto: PhotoFilterDto) {
        return 1;
    }
}
