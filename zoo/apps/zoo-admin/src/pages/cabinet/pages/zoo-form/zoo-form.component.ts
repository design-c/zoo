import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: './zoo-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ZooFormComponent {

}
