import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FileStorageService, IImage } from '../../services/file-storage.service';


export interface ISentMessage {
    text: string;
    images: IImage[];
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
    public readonly sent: EventEmitter<ISentMessage> = new EventEmitter();

    protected questionText = '';
    private readonly _minHeight = 24;
    private readonly _linesCount  = 5;

    constructor(
        protected readonly fileStorageService: FileStorageService
    ) {
    }


    public ngAfterViewInit(): void {
        this.adjustElementHeight();
    }

    protected send(): void {
        const images = this.fileStorageService.images()
        const text = this._textarea.nativeElement.value;

        this._textarea.nativeElement.value = '';
        this.fileStorageService.clearFiles();

        this.sent.emit({
            text,
            images
        });
    }

    protected adjustElementHeight(): void {
        const textarea = this._textarea.nativeElement as HTMLTextAreaElement;
        textarea.style.height = 'auto'; // Сброс высоты перед пересчетом
        const newHeight = Math.min(Math.max(textarea.scrollHeight, this._minHeight), this._minHeight * this._linesCount);
        textarea.style.height = `${ newHeight }px`;
    }
}
