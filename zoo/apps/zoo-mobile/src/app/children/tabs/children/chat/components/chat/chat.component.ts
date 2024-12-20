import { ChangeDetectionStrategy, Component } from '@angular/core';
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

}
