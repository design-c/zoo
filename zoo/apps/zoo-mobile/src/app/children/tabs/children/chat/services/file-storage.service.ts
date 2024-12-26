import { inject, Injectable, signal, Signal } from '@angular/core';
import { ChatRequestService } from '../../../../../services/chat-request.service';
import { FileRequestService } from '../../../../../services/file-request.service';
import { CURRENT_CHAT_TOKEN } from '../tokens/current-chat.token';
import { catchError, EMPTY, forkJoin, map, Observable, Subject, switchMap, take, takeUntil } from 'rxjs';

export interface IImage {
    file: File;
    preview: string;
    loading: boolean;
    id: string;
}

@Injectable()
export class FileStorageService {
    private readonly _fileService = inject(FileRequestService);
    private readonly _currentChat$ = inject(CURRENT_CHAT_TOKEN);
    private readonly _stopUpload: Record<string, Subject<void>> = {};
    private _isLoading = signal(false);

    /**
     * Получение сигнала с прикрепленными изображениями.
     */
    public get images(): Signal<IImage[]> {
        return this._images.asReadonly();
    }

    public get isLoading(): Signal<boolean> {
        return this._isLoading.asReadonly();
    }

    private readonly _images = signal<IImage[]>([]);

    /**
     * Добавление файлов в список.
     * @param files Массив файлов.
     */
    public addFiles(files: File[]): void {
        this._isLoading.set(true);
        this.makePreview(files);
        this.uploadFiles(files);
    }

    /**
     * Удаление файла из списка.
     * @param index Индекс файла для удаления.
     */
    public removeFile(index: number): void {
        const file = this._images().find((_, i) => i === index)?.file;
        if (file) {
            this._stopUpload[file.name].next();
            delete this._stopUpload[file.name];
        }

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

    private makePreview(files: File[]): void {
        const images = files.map(file => ({ file, preview: '', loading: true, id: '' }));

        images.forEach((image, index) => {
            const reader = new FileReader();
            reader.onload = () => {
                this._images.update((currentImages) => {
                    const updatedImages = [...currentImages];
                    const targetIndex = updatedImages.length - images.length + index;
                    if (updatedImages[targetIndex]) {
                        updatedImages[targetIndex] = {
                            ...updatedImages[targetIndex],
                            preview: reader.result as string,
                        };
                    }
                    return updatedImages;
                });
            };
            reader.readAsDataURL(files[index]);
        });

        this._images.update((currentImages) => [...currentImages, ...images]);
    }

    private uploadFiles(files: File[]): void {
        this._currentChat$
            .pipe(
                switchMap(chat => forkJoin(
                    files.map(file => this.uploadFile(file, chat.zooId))
                )),
                take(1),
            )
            .subscribe({
                error: () => this._isLoading.set(false),
                next: () => this._isLoading.set(false),
            });
    }

    private uploadFile(file: File, chatId: string): Observable<void> {
        this._stopUpload[file.name] = new Subject();

        return this._fileService.uploadFile(file, chatId)
            .pipe(
                map(id => this._images.update(images => {
                    const copyImages = [...images];
                    const targetIndex = images.findIndex(image => image.file === file);
                    if (targetIndex !== -1) {
                        copyImages[targetIndex] = {
                            ...copyImages[targetIndex],
                            id,
                            loading: false,
                        };
                    }

                    return copyImages;
                })),
                takeUntil(this._stopUpload[file.name]),
                catchError(() => {
                    this._images.update(images => images.filter(image => image.file !== file));
                    delete this._stopUpload[file.name];

                    return EMPTY;
                })
            );
    }
}
