export class GalleryImageModel {
    readonly id: string;
    readonly name: string;
    readonly image: string;

    constructor(data: Partial<GalleryImageModel>) {
        this.id = data.id || '';
        this.name = data.name || '';
        this.image = data.image || '';
    }
}