import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { IChat } from '../../../../../services/chat-request.service';

export const CURRENT_CHAT_TOKEN = new InjectionToken<Observable<IChat>>('Current chat');
