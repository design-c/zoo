import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AudioMessage } from '../../interfaces/chat-message.interface';

@Component({
    selector: 'zoo-audio-message',
    templateUrl: './audio-message.component.html',
    styleUrls: ['./audio-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioMessageComponent {
    @Input()
    public message!: AudioMessage;
}
