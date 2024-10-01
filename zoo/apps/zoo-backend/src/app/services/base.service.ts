import { NotFoundException } from '@nestjs/common';
import { Document, FilterQuery, Model } from 'mongoose';

export abstract class Service<T extends Document> {
    private readonly modelName: string;

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

    async findOne(
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

    async findAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async findById(id: string): Promise<T> {
        const document = await this.model.findById(id).exec();
        if (!document) {
            throw new NotFoundException(`${this.modelName} с ID ${id} не найден`);
        }
        return document;
    }

    async create(createDto: Partial<T>): Promise<T> {
        const newDocument = new this.model(createDto);

        return newDocument.save();
    }

    async update(id: string, updateDto: Partial<T>): Promise<T> {
        const updatedDocument = await this.model.findByIdAndUpdate(id, updateDto, {
            new: true,
        }).exec();
        if (!updatedDocument) {
            throw new NotFoundException(`${this.modelName} с ID ${id} не найден`);
        }

        return updatedDocument;
    }

    async delete(id: string): Promise<void> {
        const result = await this.model.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`${this.modelName} с ID ${id} не найден`);
        }
    }
}
