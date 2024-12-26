import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ISentMessage } from '../../components/chat-input/chat-input.component';
import { ChatService } from '../../services/chat.service';
import { FileStorageService } from '../../services/file-storage.service';

@Component({
    selector: 'zoo-chat-page',
    templateUrl: 'chat-page.component.html',
    styleUrls: ['chat-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPage {
    private readonly _chatFilesService = inject(FileStorageService);
    private readonly _chatService = inject(ChatService);

    public sent(message: ISentMessage): void {
        if (this._chatFilesService.isLoading()){
            return;
        }

        this._chatService.sendMessage(message.text, message.images);
    }
}
