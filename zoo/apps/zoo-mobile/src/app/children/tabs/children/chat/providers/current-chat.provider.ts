import { CURRENT_CHAT_TOKEN } from '../tokens/current-chat.token';
import { ChatRequestService, IChat } from '../../../../../services/chat-request.service';
import { inject } from '@angular/core';
import { CURRENT_ZOO_TOKEN } from '../../../../../tokens/current-zoo.token';
import { defer, iif, of, switchMap, tap } from 'rxjs';

export const CURRENT_CHAT_PROVIDER = {
    provide: CURRENT_CHAT_TOKEN,
    useFactory: () => {
        const chatService = inject(ChatRequestService);
        const currentZoo$ = inject(CURRENT_ZOO_TOKEN);
        let activeChat: null | IChat = null;

        return defer(() => activeChat
            ? of(activeChat)
            : chatService.getMyChats()
                .pipe(
                    switchMap(chats => iif(() => chats.length > 0,
                        of(chats[0]),
                        currentZoo$
                            .pipe(
                                switchMap(zoo => chatService.createChat(zoo.id))
                            )
                    )),
                    tap(chat => activeChat = chat)
                ));
    }
}
