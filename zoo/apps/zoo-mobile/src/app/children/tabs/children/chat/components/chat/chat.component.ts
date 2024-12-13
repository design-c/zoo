import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
    selector: 'zoo-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
    public readonly messages = this.chatService.getMessages();

    constructor(private readonly chatService: ChatService) {}

    /**
     * Обработчик скролла вверх для загрузки новых сообщений.
     */
    @HostListener('scroll', ['$event.target'])
    public onScroll(event: HTMLElement): void {
        if (event.scrollTop === 0) {
            this.chatService.loadMoreMessages();
        }
    }
}
