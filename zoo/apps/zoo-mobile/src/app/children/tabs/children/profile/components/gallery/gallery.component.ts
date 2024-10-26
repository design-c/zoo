import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-gallery-component',
    templateUrl: './gallery.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['gallery.component.scss']
})
export class GalleryComponent {

    @Input()
    public images: string[] = [];

    protected get isOdd(): boolean {
        return this.images.length % 2 !== 0;
    }

}
