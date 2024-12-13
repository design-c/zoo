import { Injectable, signal, Signal } from '@angular/core';

export interface IImage {
    file: File;
    preview: string;
    loading: boolean;
}

@Injectable()
export class FileStorageService {
    /**
     * Получение сигнала с прикрепленными изображениями.
     */
    public get images(): Signal<IImage[]> {
        return this._images.asReadonly();
    }

    private readonly _images = signal<IImage[]>([]);

    /**
     * Добавление файлов в список.
     * @param files Массив файлов.
     */
    public addFiles(files: File[]): void {
        const newImages = files.map((file) => ({
            file,
            preview: '',
            loading: true,
        }));

        // Добавляем новые изображения в сигнал
        this._images.update((currentImages) => [...currentImages, ...newImages]);

        // Генерация превью для каждого нового изображения
        newImages.forEach((image, index) => {
            const reader = new FileReader();
            reader.onload = () => {
                this._images.update((currentImages) => {
                    const updatedImages = [...currentImages];
                    const targetIndex = updatedImages.length - newImages.length + index;
                    if (updatedImages[targetIndex]) {
                        updatedImages[targetIndex] = {
                            ...updatedImages[targetIndex],
                            preview: reader.result as string,
                            loading: false,
                        };
                    }
                    return updatedImages;
                });
            };
            reader.readAsDataURL(files[index]);
        });
    }

    /**
     * Удаление файла из списка.
     * @param index Индекс файла для удаления.
     */
    public removeFile(index: number): void {
        this._images.update((currentImages) =>
            currentImages.filter((_, i) => i !== index)
        );
    }

    /**
     * Очистка списка изображений.
     */
    public clearFiles(): void {
        this._images.set([]);
    }
}
