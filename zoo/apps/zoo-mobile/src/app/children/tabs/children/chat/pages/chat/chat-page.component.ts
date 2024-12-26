import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ISentMessage } from '../../components/chat-input/chat-input.component';
import { ChatService } from '../../services/chat.service';
import { CURRENT_CHAT_TOKEN } from '../../tokens/current-chat.token';

@Component({
    selector: 'zoo-chat-page',
    templateUrl: 'chat-page.component.html',
    styleUrls: ['chat-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPage implements OnInit {
    private readonly _chatService = inject(ChatService);
    private readonly _currentChat$ = inject(CURRENT_CHAT_TOKEN);

    public sent(message: ISentMessage): void {
        this._chatService.sendMessage(message.text, message.images);
    }

    public ngOnInit(): void {
        this._currentChat$.subscribe();
    }
}
