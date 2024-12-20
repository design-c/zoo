import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WritingMessage } from '../../interfaces/chat-message.interface';
import { map } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
    selector: 'zoo-writing-message',
    templateUrl: './writing-message.component.html',
    styleUrls: ['./writing-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WritingMessageComponent {
    @Input()
    public message!: WritingMessage;

    public readonly dots$ = interval(300)
        .pipe(
            map((count) => '.'.repeat((count % 3) + 1)) // Формируем строку из 1–3 точек
        )
}
