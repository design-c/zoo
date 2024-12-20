import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { TuiScrollbar } from '@taiga-ui/core';

@Component({
    selector: 'zoo-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
    public readonly messages = this.chatService.getMessages();

    @ViewChild(TuiScrollbar, {read: ElementRef})
    protected scrollBar!: ElementRef<HTMLElement>;

    constructor(private readonly chatService: ChatService) {
    }

    public scroll(): void {
        if (!this.scrollBar) {
            return;
        }

        const { nativeElement } = this.scrollBar;

        setTimeout(() => {
            nativeElement.scrollTo({
                top: nativeElement.scrollHeight,
                behavior: 'smooth'
            });
        }, 50);
    }
}
