import { ChangeDetectionStrategy, Component, computed, Input, signal, WritableSignal } from '@angular/core';
import { GalleryImageModel } from '../../models/gallery-image.model';

@Component({
    selector: 'app-gallery-component',
    templateUrl: './gallery.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['gallery.component.scss']
})
export class GalleryComponent {
    @Input()
    public images: GalleryImageModel[] = [];

    protected get open(): boolean {
        return this.status() !== null;
    }

    protected set open(value: boolean) {
        if (!value) {
            this.status.set(null)
        }
    }

    protected imagesSignal = computed(() => this.images.map(i => ( { src: i.image, title: i.name })))

    protected status: WritableSignal<{ index: number, image: string } | null> = signal(null);

    protected openImg(image: string, index: number): void {
        this.status.set({ index, image: image });
    }
}
