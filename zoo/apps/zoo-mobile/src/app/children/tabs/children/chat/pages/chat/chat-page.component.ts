import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ISentMessage } from '../../components/chat-input/chat-input.component';

@Component({
    selector: 'zoo-chat-page',
    templateUrl: 'chat-page.component.html',
    styleUrls: ['chat-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPage {

    public sent(message: ISentMessage): void {
        console.log(message);
    }
}
