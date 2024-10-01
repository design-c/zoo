import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './animal.entity';

@ApiTags('Animals')
@Controller('admin/animal')
export class AnimalController {
    constructor(private readonly animalService: AnimalService) {
    }

    @Get()
    @ApiOperation({ summary: 'Получить список всех животных' })
    @ApiResponse({ status: 200, description: 'Список всех животных.', type: Animal, isArray: true })
    async getAllAnimals() {
        return await this.animalService.findAll();
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
    @ApiBody({ type: CreateAnimalDto })
    @ApiResponse({ status: 201, description: 'Животное создано.', type: Animal })
    async createAnimal(@Body() createAnimalDto: CreateAnimalDto) {
        return await this.animalService.create(createAnimalDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить информацию о животном' })
    @ApiParam({ name: 'id', description: 'ID животного' })
    @ApiBody({ type: UpdateAnimalDto })
    @ApiResponse({ status: 200, description: 'Информация о животном обновлена.', type: Animal })
    @ApiResponse({ status: 404, description: 'Животное не найдено.' })
    async updateAnimal(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
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
