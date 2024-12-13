import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

export interface IImage {
    file: File;
    preview: string;
    loading: boolean
}

@Component({
    selector: 'zoo-chat-input',
    templateUrl: './chat-input.component.html',
    styleUrls: ['chat-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent implements AfterViewInit {
    @ViewChild('input')
    private readonly _textarea!: ElementRef;

    @Output()
    public readonly sent: EventEmitter<any> = new EventEmitter();

    protected questionText = '';
    private readonly _minHeight = 24;
    private readonly _linesCount  = 5;


    public ngAfterViewInit(): void {
        this.adjustElementHeight();
    }

    protected send(): void {
        this.sent.emit();
    }

    protected adjustElementHeight(): void {
        const textarea = this._textarea.nativeElement as HTMLTextAreaElement;
        textarea.style.height = 'auto'; // Сброс высоты перед пересчетом
        const newHeight = Math.min(Math.max(textarea.scrollHeight, this._minHeight), this._minHeight * this._linesCount);
        textarea.style.height = `${ newHeight }px`;
    }
}
