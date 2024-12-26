import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Интерфейс зоопарка.
 */
export interface IZoo {
    id: string;
    name: string;
    description: string;
    location: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Интерфейс для параметров пагинации и фильтрации.
 */
export interface IPhotoQueryParams {
    limit?: number;
    offset?: number;
    sort?: 'asc' | 'desc';
    filter?: string;
}

@Injectable()
export class ZooRequestService {
    private readonly apiUrl: string = './api/zoo';

    constructor(private readonly http: HttpClient) {
    }

    /**
     * Получить список зоопарков с фильтрацией и пагинацией.
     * @param limit Количество элементов для получения.
     * @param offset Смещение для пагинации.
     * @param sort Порядок сортировки по дате.
     * @returns Observable<Zoo[]> Список зоопарков.
     */
    public getZoos(limit: number = 10, offset: number = 0, sort: 'asc' | 'desc' = 'desc'): Observable<IZoo[]> {
        const params = new HttpParams()
            .set('limit', limit.toString())
            .set('offset', offset.toString())
            .set('sort', sort);

        return this.http.get<IZoo[]>(`${ this.apiUrl }`, { params });
    }

    /**
     * Создать новый зоопарк.
     * @param zoo Данные зоопарка.
     * @returns Observable<Zoo> Созданный зоопарк.
     */
    public createZoo(zoo: Partial<IZoo>): Observable<IZoo> {
        return this.http.post<IZoo>(`${ this.apiUrl }`, zoo);
    }

    /**
     * Получить информацию о зоопарке по ID.
     * @param id ID зоопарка.
     * @returns Observable<Zoo> Информация о зоопарке.
     */
    public getZooById(id: string): Observable<IZoo> {
        return this.http.get<IZoo>(`${ this.apiUrl }/${ id }`);
    }

    /**
     * Обновить информацию о зоопарке.
     * @param id ID зоопарка.
     * @param zoo Данные для обновления.
     * @returns Observable<Zoo> Обновлённый зоопарк.
     */
    public updateZoo(id: string, zoo: Partial<IZoo>): Observable<IZoo> {
        return this.http.put<IZoo>(`${ this.apiUrl }/${ id }`, zoo);
    }

    /**
     * Удалить зоопарк.
     * @param id ID зоопарка.
     * @returns Observable<void> Завершение удаления.
     */
    public deleteZoo(id: string): Observable<void> {
        return this.http.delete<void>(`${ this.apiUrl }/${ id }`);
    }

    /**
     * Получить список фотографий зоопарка.
     * @param id ID зоопарка.
     * @param params Параметры фильтрации и пагинации.
     * @returns Observable<any[]> Список фотографий.
     */
    public getZooPhotos(id: string, params: IPhotoQueryParams = {}): Observable<any[]> {
        const httpParams = new HttpParams({ fromObject: { ...params } });
        return this.http.get<any[]>(`${ this.apiUrl }/${ id }/photos`, { params: httpParams });
    }
}
