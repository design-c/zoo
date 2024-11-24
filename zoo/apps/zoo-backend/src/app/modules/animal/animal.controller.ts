import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUpdateAnimalDto } from './dto/create-update-animal.dto';
import { AuthRoles } from '../auth/guards';
import { Animal, AnimalService, LimitQueryDto, UserRole } from '../../shared';
import { Types } from 'mongoose';

@ApiTags('Animals')
@Controller('zoo/animal')
@AuthRoles(UserRole.admin)
export class AnimalController {
    constructor(private readonly _animalService: AnimalService) {
    }

    @Get(':zooId/list')
    @AuthRoles(UserRole.user)
    @ApiParam({ name: 'zooId', description: 'ID зоопарка', type: String })
    @ApiOperation({ summary: 'Получить список всех животных' })
    @ApiResponse({ status: 200, description: 'Список всех животных.', type: Animal, isArray: true })
    async getAllAnimals(@Param('zooId') zooId: Types.ObjectId, @Query() filterDto: LimitQueryDto) {
        return await this._animalService.findAll({ ...filterDto, zooId });
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'ID животного', type: String })
    @ApiOperation({ summary: 'Получить информацию о животном по ID' })
    @ApiResponse({ status: 200, description: 'Животное найдено.', type: Animal })
    @ApiResponse({ status: 404, description: 'Животное не найдено.' })
    async getAnimalById(@Param('id') id: Types.ObjectId) {
        return await this._animalService.findById(id);
    }

    @Post(':id')
    @HttpCode(201)
    @ApiParam({ name: 'id', description: 'ID зоопарка', type: String })
    @ApiOperation({ summary: 'Создать новое животное' })
    @ApiBody({ type: CreateUpdateAnimalDto })
    @ApiResponse({ status: 201, description: 'Животное создано.', type: Animal })
    async createAnimal(@Param('id') zooId: Types.ObjectId, @Body() createAnimalDto: CreateUpdateAnimalDto) {
        return await this._animalService.create({ zooId, ...createAnimalDto});
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить информацию о животном' })
    @ApiParam({ name: 'id', description: 'ID животного', type: String })
    @ApiBody({ type: CreateUpdateAnimalDto })
    @ApiResponse({ status: 200, description: 'Информация о животном обновлена.', type: Animal })
    @ApiResponse({ status: 404, description: 'Животное не найдено.' })
    async updateAnimal(@Param('id') id: Types.ObjectId, @Body() updateAnimalDto: CreateUpdateAnimalDto) {
        return await this._animalService.update(id, updateAnimalDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Удалить животное' })
    @ApiParam({ name: 'id', description: 'ID животного', type: String })
    @ApiResponse({ status: 204, description: 'Животное удалено.' })
    @ApiResponse({ status: 404, description: 'Животное не найдено.' })
    async deleteAnimal(@Param('id') id: Types.ObjectId) {
        await this._animalService.delete(id);
    }
}
