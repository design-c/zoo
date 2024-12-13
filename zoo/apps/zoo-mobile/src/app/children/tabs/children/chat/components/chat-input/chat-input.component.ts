import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, signal, ViewChild, WritableSignal } from '@angular/core';

export interface IImage {
    file: File;
    preview: string;
    loading: boolean
}

@Component({
    selector: 'app-chat-input',
    templateUrl: './chat-input.component.html',
    styleUrls: ['chat-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent implements AfterViewInit {
    protected attachedImages: WritableSignal<IImage[]> = signal([]);

    @ViewChild('input')
    private readonly _textarea!: ElementRef;

    @ViewChild('left')
    private readonly _leftIcon!: ElementRef;

    @ViewChild('right')
    private readonly _rightIcon!: ElementRef;

    @Output()
    public readonly sent: EventEmitter<any> = new EventEmitter();

    protected questionText = '';
    private readonly _minHeight = 24;
    private readonly _linesCount  = 5;




    public ngAfterViewInit(): void {
        this.adjustElementHeight();
    }

    protected removeImage(index: number): void {
        const updatedImages = [...this.attachedImages()];
        updatedImages.splice(index, 1);
        this.attachedImages.set(updatedImages);
    }

    protected attachImage(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const currentImages = this.attachedImages();
                const newImage: IImage = {
                    file,
                    preview: reader.result as string,
                    loading: true // Изначально показываем лоадер
                };

                this.attachedImages.set(currentImages.concat(newImage));

                // Эмуляция загрузки (можно заменить на реальную логику)
                setTimeout(() => {
                    const updatedImages = this.attachedImages().map((image) =>
                        image === newImage ? { ...image, loading: false } : image
                    );
                    this.attachedImages.set(updatedImages);
                }, 2000); // Загрузка длится 2 секунды
            };

            reader.readAsDataURL(file);
        }
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
