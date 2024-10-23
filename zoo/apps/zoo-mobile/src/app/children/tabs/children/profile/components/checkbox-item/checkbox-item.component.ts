import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-checkbox-item',
    templateUrl: './checkbox-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['checkbox-item.component.scss']
})
export class CheckboxItemComponent {

    @Input()
    public name?: string;

}
