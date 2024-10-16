import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUpdateAnimalDto } from './dto/create-update-animal.dto';
import { Animal } from './animal.entity';
import { AuthRoles } from '../auth/guards';
import { UserRole } from '../users';

@ApiTags('Animals')
@Controller('zoo/animal')
@AuthRoles(UserRole.admin)
export class AnimalController {
    constructor(private readonly animalService: AnimalService) {
    }

    @Get()
    @AuthRoles(UserRole.user)
    @ApiOperation({ summary: 'Получить список всех животных' })
    @ApiResponse({ status: 200, description: 'Список всех животных.', type: Animal, isArray: true })
    @ApiQuery({ name: 'zooId', required: true, description: 'ID зоопарка для фильтрации вопросов' })
    async getAllAnimals(@Query('zooId') zooId: string) {
        return await this.animalService.findAll(zooId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить информацию о животном по ID' })
    @ApiParam({ name: 'id', description: 'ID животного' })
    @ApiResponse({ status: 200, description: 'Животное найдено.', type: Animal })
    @ApiResponse({ status: 404, description: 'Животное не найдено.' })
    async getAnimalById(@Param('id') id: string) {
        return await this.animalService.findById(id);
    }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Создать новое животное' })
    @ApiBody({ type: CreateUpdateAnimalDto })
    @ApiResponse({ status: 201, description: 'Животное создано.', type: Animal })
    async createAnimal(@Body() createAnimalDto: CreateUpdateAnimalDto) {
        return await this.animalService.create(createAnimalDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить информацию о животном' })
    @ApiParam({ name: 'id', description: 'ID животного' })
    @ApiBody({ type: CreateUpdateAnimalDto })
    @ApiResponse({ status: 200, description: 'Информация о животном обновлена.', type: Animal })
    @ApiResponse({ status: 404, description: 'Животное не найдено.' })
    async updateAnimal(@Param('id') id: string, @Body() updateAnimalDto: CreateUpdateAnimalDto) {
        return await this.animalService.update(id, updateAnimalDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Удалить животное' })
    @ApiParam({ name: 'id', description: 'ID животного' })
    @ApiResponse({ status: 204, description: 'Животное удалено.' })
    @ApiResponse({ status: 404, description: 'Животное не найдено.' })
    async deleteAnimal(@Param('id') id: string) {
        await this.animalService.delete(id);
    }
}
