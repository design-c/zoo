import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ISentMessage } from '../../components/chat-input/chat-input.component';
import { ChatService } from '../../services/chat.service';

@Component({
    selector: 'zoo-chat-page',
    templateUrl: 'chat-page.component.html',
    styleUrls: ['chat-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPage {

    constructor(
        private readonly _chatService: ChatService
    ) {
    }

    public sent(message: ISentMessage): void {
        this._chatService.sendMessage(message.text, message.images);
    }
}
