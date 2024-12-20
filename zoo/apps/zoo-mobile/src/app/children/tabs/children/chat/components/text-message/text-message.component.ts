import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TextMessage } from '../../interfaces/chat-message.interface';

@Component({
    selector: 'zoo-text-message',
    templateUrl: './text-message.component.html',
    styleUrls: ['./text-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageComponent {
    @Input()
    public message!: TextMessage;
}
