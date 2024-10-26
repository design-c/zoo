import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-checkbox-item',
    templateUrl: './checkbox-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['checkbox-item.component.scss']
})
export class CheckboxItemComponent {

    @Input()
    public isSelected: boolean = true;

    @Output()
    public isSelectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    public name?: string;

}
