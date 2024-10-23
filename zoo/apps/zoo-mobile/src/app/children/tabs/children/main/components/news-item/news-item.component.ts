import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-news-item',
    templateUrl: './news-item.component.html',
    styleUrls: ['news-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsItemComponent {
    @Input()
    public title?: string;

    @Input()
    public imageUrl?: string;

    @Input()
    public date?: Date;
}
