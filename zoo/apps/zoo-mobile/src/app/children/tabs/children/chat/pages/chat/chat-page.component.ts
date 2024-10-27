import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-chat-page',
    templateUrl: 'chat-page.component.html',
    styleUrls: ['chat-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPage {
    constructor() {
    }
}
