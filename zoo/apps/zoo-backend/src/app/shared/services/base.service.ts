import { NotFoundException } from '@nestjs/common';
import { Document, FilterQuery, Model, Types } from 'mongoose';
import { IFilterAll } from '../interfaces';
import { clearObj } from '../utils';


export abstract class MongoService<T extends Document> {
    protected readonly modelName: string;

    constructor(
        protected readonly model: Model<T>,
    ) {
        for (const modelName of Object.keys(model.collection.conn.models)) {
            if (model.collection.conn.models[modelName] === this.model) {
                this.modelName = modelName;
                break;
            }
        }
    }

    /**
     * Находит одну запись по указанным условиям.
     * @param conditions - Условия для поиска.
     * @param projection - Опционально: поля для проекции.
     * @param options - Опционально: дополнительные параметры запроса.
     * @returns Промис, который возвращает найденный документ или выбрасывает исключение, если документ не найден.
     */
    public async findOne(
        conditions: Partial<Record<keyof T, unknown>>,
        projection: string | Record<string, unknown> = {},
        options: Record<string, unknown> = {},
    ): Promise<T> {
        try {
            return await this.model.findOne(
                conditions as FilterQuery<T>,
                projection,
                options,
            );
        } catch {
            throw new NotFoundException(`${this.modelName} не найден`);
        }
    }

    /**
     * Возвращает список записей с возможностью фильтрации и сортировки.
     * @param filters - Объект с опциональными параметрами фильтрации.
     *                  Включает zooId, limit, offset, sort и date.
     * @returns Промис, который возвращает массив найденных документов.
     */
    public async findAll(filters?: IFilterAll): Promise<T[]> {
        const { zooId, limit = 25, offset = 0, sort = 'desc', userId, fields, ...other } = filters ?? {};
        const query: FilterQuery<IFilterAll> = clearObj({ zooId, userId, ...other });
        const sortOption: Record<string, 1 | -1> = { createdAt: sort === 'asc' ? 1 : -1 };

        return this.model
            .find(query)
            .select(fields)
            .sort(sortOption)
            .skip(offset)
            .limit(limit)
            .exec();
    }

    /**
     * Находит запись по ее ID.
     * @param id - Идентификатор записи.
     * @param fields поля финального объекта
     * @returns Промис, который возвращает найденный документ или выбрасывает исключение, если документ не найден.
     */
    public async findById(id: string | Types.ObjectId, fields?: string[]): Promise<T> {
        const document = await this.model.findById(id)
            .select(fields)
            .exec();
        if (!document) {
            throw new NotFoundException(`${this.modelName} с ID ${id} не найден`);
        }

        return document;
    }

    /**
     * Создает новую запись.
     * @param createDto - DTO с данными для создания новой записи.
     * @returns Промис, который возвращает созданный документ.
     */
    public async create(createDto: Partial<T>): Promise<T> {
        return (new this.model(createDto)).save();
    }

    /**
     * Обновляет запись по ее ID.
     * @param id - Идентификатор записи.
     * @param updateDto - DTO с обновленными данными.
     * @returns Промис, который возвращает обновленный документ или выбрасывает исключение, если документ не найден.
     */
    public async update(id: string | Types.ObjectId, updateDto: Partial<T>): Promise<T> {
        const updatedDocument = await this.model.findByIdAndUpdate(id, updateDto, {
            new: true,
        }).exec();
        if (!updatedDocument) {
            throw new NotFoundException(`${this.modelName} с ID ${id} не найден`);
        }

        return updatedDocument;
    }

    /**
     * Удаляет запись по ее ID.
     * @param id - Идентификатор записи.
     * @returns Промис, который завершится, когда запись будет удалена, или выбросит исключение, если запись не найдена.
     */
    public async delete(id: string | Types.ObjectId): Promise<void> {
        const result = await this.model.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`${this.modelName} с ID ${id} не найден`);
        }
    }
}
