import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: './animals-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class AnimalsFormComponent {

}
