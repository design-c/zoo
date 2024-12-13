import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {TuiSwipe} from '@taiga-ui/cdk';
import {TuiButton} from '@taiga-ui/core';
import {TuiPreview, TuiPreviewDialogDirective} from '@taiga-ui/kit';
import {PolymorpheusOutlet, PolymorpheusTemplate} from '@taiga-ui/polymorpheus';

export interface IPreviewImage {
    readonly src: string;
    readonly title?: string;
}

@Component({
    selector: 'zoo-preview-image',
    standalone: true,
    imports: [
        PolymorpheusOutlet,
        PolymorpheusTemplate,
        TuiButton,
        TuiPreview,
        TuiPreviewDialogDirective,
        TuiSwipe,
    ],
    templateUrl: './preview-image.component.html',
    styleUrls: ['./preview-image.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PreviewImageComponent {
    @Input()
    public open = false;
    @Input()
    public images: IPreviewImage[] = [];
    @Input()
    public index = 0;

    @Output()
    public readonly openChange = new EventEmitter<boolean>();

    protected close(): void {
        this.openChange.emit(false);
        this.open = false;
    }

    protected download(): void {
        const currentImage = this.images[this.index];
        if (!currentImage) {
            return;
        }

        const link = document.createElement('a');
        link.href = currentImage.src;
        link.download = `image-${currentImage.title || (this.index + 1)}.png`;
        link.click();
    }

    protected share(): void {
        const currentImage = this.images[this.index];
        if (!currentImage || !navigator.share) {
            return;
        }

        navigator
            .share({
                title: currentImage.title || 'Поделиться изображением',
                url: currentImage.src,
            })
            .catch((error) => console.error('Ошибка при попытке поделиться:', error));
    }
}
