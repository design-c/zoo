import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-chat-input',
    templateUrl: './chat-input.component.html',
    styleUrls: ['chat-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent implements AfterViewInit {

    protected questionText: string = '';
    private readonly _minHeight = 24; // Минимальная высота

    @ViewChild('input')
    private readonly _textarea!: ElementRef;

    @ViewChild('left')
    private readonly _leftIcon!: ElementRef;

    @ViewChild('right')
    private readonly _rightIcon!: ElementRef;

    public ngAfterViewInit(): void {
        this.adjustElementHeight();
    }

    protected adjustElementHeight(): void {
        const textarea = this._textarea.nativeElement as HTMLTextAreaElement;
        const left = this._leftIcon.nativeElement;
        const right = this._rightIcon.nativeElement;

        textarea.style.height = 'auto'; // Сброс высоты перед пересчетом
        const newHeight = Math.max(textarea.scrollHeight, this._minHeight);

        this.updateHeight(textarea, newHeight);
        this.updateHeight(left, newHeight);
        this.updateHeight(right, newHeight);
    }

    private updateHeight(element: HTMLElement, height: number): void {
        element.style.height = `${ height }px`;
    }
}
