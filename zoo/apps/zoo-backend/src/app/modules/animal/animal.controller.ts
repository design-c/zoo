import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUpdateAnimalDto } from './dto/create-update-animal.dto';
import { Animal } from './animal.entity';
import { AuthRoles } from '../auth/guards';
import { UserRole } from '../../shared';
import { Types } from 'mongoose';

@ApiTags('Animals')
@Controller('zoo/:zooId/animal')
@AuthRoles(UserRole.admin)
export class AnimalController {
    constructor(private readonly animalService: AnimalService) {
    }

    @Get()
    @AuthRoles(UserRole.user)
    @ApiOperation({ summary: 'Получить список всех животных' })
    @ApiResponse({ status: 200, description: 'Список всех животных.', type: Animal, isArray: true })
    async getAllAnimals(@Param('zooId') zooId: string) {
        return await this.animalService.findAll(zooId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить информацию о животном по ID' })
    @ApiResponse({ status: 200, description: 'Животное найдено.', type: Animal })
    @ApiResponse({ status: 404, description: 'Животное не найдено.' })
    async getAnimalById(@Param('zooId') zooId: Types.ObjectId, @Param('id') id: string) {
        return await this.animalService.findById(id);
    }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Создать новое животное' })
    @ApiBody({ type: CreateUpdateAnimalDto })
    @ApiResponse({ status: 201, description: 'Животное создано.', type: Animal })
    async createAnimal(@Param('zooId') zooId: Types.ObjectId, @Body() createAnimalDto: CreateUpdateAnimalDto) {
        return await this.animalService.create({ zooId, ...createAnimalDto});
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить информацию о животном' })
    @ApiParam({ name: 'id', description: 'ID животного' })
    @ApiBody({ type: CreateUpdateAnimalDto })
    @ApiResponse({ status: 200, description: 'Информация о животном обновлена.', type: Animal })
    @ApiResponse({ status: 404, description: 'Животное не найдено.' })
    async updateAnimal(@Param('zooId') zooId: Types.ObjectId, @Param('id') id: string, @Body() updateAnimalDto: CreateUpdateAnimalDto) {
        return await this.animalService.update(id, updateAnimalDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Удалить животное' })
    @ApiParam({ name: 'id', description: 'ID животного' })
    @ApiResponse({ status: 204, description: 'Животное удалено.' })
    @ApiResponse({ status: 404, description: 'Животное не найдено.' })
    async deleteAnimal(@Param('zooId') zooId: Types.ObjectId, @Param('id') id: string) {
        await this.animalService.delete(id);
    }
}
