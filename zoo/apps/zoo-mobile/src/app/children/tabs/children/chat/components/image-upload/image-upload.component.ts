import { Component } from '@angular/core';
import { FileStorageService } from '../../services/file-storage.service';

@Component({
    selector: 'zoo-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

    constructor(
        protected readonly fileStorageService: FileStorageService
    ) {
    }


    protected attachImage(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            this.fileStorageService.addFiles(Array.from(input.files));
        }
    }
}
