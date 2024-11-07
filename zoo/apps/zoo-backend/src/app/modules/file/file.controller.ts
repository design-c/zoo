import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, NotFoundException, Param, Post, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthRoles } from '../auth/guards';
import { FileStorageService, FileType, LimitQueryDto, UserRole } from '../../shared';
import 'multer';
import { Types } from 'mongoose';


@ApiTags('File')
@Controller('/files')
@AuthRoles(UserRole.user)
export class FileController {
    constructor(private readonly _fileService: FileStorageService) {}

    /**
     * Получение списка файлов с фильтрацией
     * @param query - Параметры фильтрации и пагинации
     * @param req - Запрос с данными авторизованного пользователя
     * @returns Список файлов, соответствующих параметрам запроса
     */
    @Get()
    @ApiOperation({ summary: 'Получить список файлов с фильтрацией' })
    @ApiResponse({ status: 200, description: 'Файлы успешно получены.' })
    public async getFiles(
        @Query() query: LimitQueryDto = {},
        @Req() req: { user: { id: string } }
    ) {
        return (await this._fileService.findAll({ ...query, userId: req.user.id, fields: ['_id']}))
            .map(v => v._id);
    }

    /**
     * Загрузка изображения или аудио файла
     * @param file - Файл для загрузки
     * @param zooId - Идентификатор зоопарка
     * @param req - Запрос с данными авторизованного пользователя
     * @returns Сообщение об успешной загрузке и ID файла
     */
    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Загрузить изображение или аудио' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Загрузите изображение или аудио',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'Файл для загрузки',
                },
                zooId: {
                    type: 'string',
                    description: 'Идентификатор зоопарка',
                },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'Файл успешно загружен и сохранен.', type: String })
    @UseInterceptors(FileInterceptor('file'))
    public async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body('zooId') zooId: Types.ObjectId,
        @Req() req: { user: { id: string } }
    ) {
        if (!file) {
            throw new NotFoundException('Файл не найден');
        }
        const base64Content = file.buffer.toString('base64');
        const fileType = file.mimetype.startsWith('image') ? FileType.image : FileType.audio;

        const fileStorageData = {
            content: `data:${file.mimetype};base64,${base64Content}`,
            type: fileType,
            userId: req.user.id,
            zooId,
        };

        return (await this._fileService.create(fileStorageData))._id;
    }

    /**
     * Получение файла по ID
     * @param id - Идентификатор файла
     * @param res - Объект ответа для отправки файла напрямую
     * @returns Найденный файл или исключение, если файл не найден
     */
    @Get(':id')
    @ApiOperation({ summary: 'Получить файл по ID' })
    @ApiResponse({ status: 200, description: 'Файл успешно получен.' })
    @ApiResponse({ status: 404, description: 'Файл не найден.' })
    public async getFileById(@Param('id') id: string, @Res() res: Response) {
        const file = await this._fileService.findById(id);
        const [mimeType] = file.content.split(';');
        res.setHeader('Content-Type', mimeType.replace('data:', ''));

        const base64Data = file.content.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');

        res.status(HttpStatus.OK).send(buffer);
    }

    /**
     * Получение файла по ID
     * @param id - Идентификатор файла
     * @returns Найденный файл или исключение, если файл не найден
     */
    @Get(':id/info')
    @ApiOperation({ summary: 'Получить информацию о файле по ID' })
    @ApiResponse({ status: 200, description: 'Файл успешно получен.' })
    @ApiResponse({ status: 404, description: 'Файл не найден.' })
    public async getFileInfoById(@Param('id') id: string) {
        return this._fileService.findById(id, ['_id', 'type', 'userId', 'zooId'])
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Удалить файл' })
    @ApiResponse({ status: 204, description: 'Файл удален.' })
    @ApiResponse({ status: 404, description: 'Файл не найдено.' })
    async deleteFile(@Param('id') id: string) {
        await this._fileService.delete(id);
    }
}
