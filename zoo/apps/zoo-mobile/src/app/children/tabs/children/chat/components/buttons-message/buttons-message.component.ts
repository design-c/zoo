import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonsMessage } from '../../interfaces/chat-message.interface';


@Component({
    selector: 'zoo-buttons-message',
    templateUrl: './buttons-message.component.html',
    styleUrls: ['./buttons-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsMessageComponent {
    public get formattedButtons(): [] {
        return [];
    }

    @Input()
    public message!: ButtonsMessage;

}
