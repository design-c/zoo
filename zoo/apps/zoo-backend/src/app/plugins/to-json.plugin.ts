import { Schema } from 'mongoose';

export function toJSONPlugin(schema: Schema) {
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false, // Отключает поле __v
        transform: (doc, ret) => {
            ret.id = ret._id;    // Заменяет _id на id
            delete ret._id;    // Удаляет _id
        },
    });
}
