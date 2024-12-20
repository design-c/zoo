import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GalleryImageModel } from '../models/gallery-image.model';
import { GalleryImageConstant } from '../constants/gallery-image.constant';

@Injectable()
export class ProfileManagerService {

    /**
     * Получить
     */
    public getAnimals(): Observable<GalleryImageModel[]> {
        return of(GalleryImageConstant)
            .pipe(
                delay(1000),
                map((data) => data.slice(0,20).map((item) => new GalleryImageModel(item)))
            );
    }
}