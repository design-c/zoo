import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonsMessage } from '../../interfaces/chat-message.interface';


@Component({
    selector: 'zoo-buttons-message',
    templateUrl: './buttons-message.component.html',
    styleUrls: ['./buttons-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsMessageComponent {
    @Input()
    public message!: ButtonsMessage;
}
