import { ChangeDetectionStrategy, Component, computed, Input, signal, WritableSignal } from '@angular/core';
import { ImageGroupMessage } from '../../interfaces/chat-message.interface';

@Component({
    selector: 'zoo-image-group-message',
    templateUrl: './image-group-message.component.html',
    styleUrls: ['./image-group-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGroupMessageComponent {
    @Input()
    public message!: ImageGroupMessage;

    protected images = computed(() => this.message.imageUrls.map(i => ( { src: i })))

    protected get open(): boolean {
        return this.status() !== null;
    }

    protected set open(value: boolean) {
        if (!value) {
            this.status.set(null)
        }
    }


    protected status: WritableSignal<{ index: number, image: string } | null> = signal(null);

    protected openImg(image: string, index: number): void {
        this.status.set({ index, image: image });
    }
}
