import { NotFoundException } from '@nestjs/common';
import { Document, FilterQuery, Model, Types } from 'mongoose';

export abstract class Service<T extends Document> {
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
     * Возвращает список всех записей, с возможностью фильтрации по zooId.
     * @param zooId - Опциональный параметр для фильтрации по zooId.
     * @returns Промис, который возвращает массив найденных документов.
     */
    public async findAll(zooId: string | Types.ObjectId): Promise<T[]> {
        return this.model.find({ zooId }).exec();
    }

    /**
     * Находит запись по ее ID.
     * @param id - Идентификатор записи.
     * @returns Промис, который возвращает найденный документ или выбрасывает исключение, если документ не найден.
     */
    public async findById(id: string | Types.ObjectId): Promise<T> {
        const document = await this.model.findById(id).exec();
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
