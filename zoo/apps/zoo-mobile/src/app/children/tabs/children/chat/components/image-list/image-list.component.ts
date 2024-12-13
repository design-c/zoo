import { Component, computed, signal, WritableSignal } from '@angular/core';
import { FileStorageService, IImage } from '../../services/file-storage.service';

@Component({
    selector: 'zoo-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent {
    protected images = computed(() => this.fileStorageService.images().map( f => ({ src: f.preview })));

    protected get open(): boolean {
        return this.status() !== null;
    }

    protected set open(value: boolean) {
        if (!value) {
            this.status.set(null)
        }
    }


    protected status: WritableSignal<{ index: number, image: string } | null> = signal(null);

    constructor(
        protected readonly fileStorageService: FileStorageService
    ) {
    }

    protected openImg(image: IImage, index: number): void {
        this.status.set({ index, image: image.preview });
    }

    protected onRemove(index: number): void {
        this.fileStorageService.removeFile(index);
    }
}
