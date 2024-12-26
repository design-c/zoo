import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class FileRequestService {
    private readonly apiUrl: string = '/api/files';

    constructor(private readonly _http: HttpClient) {
    }

    public getFiles(limit: number = 10, offset: number = 0, sort: 'asc' | 'desc' = 'desc'): Observable<string[]> {
        const params = new HttpParams()
            .set('limit', limit)
            .set('offset', offset)
            .set('sort', sort);

        return this._http.get<string[]>(`${ this.apiUrl }`, { params });
    }

    public uploadFile(file: File, zooId: string): Observable<string> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('zooId', zooId);

        return this._http.post<string>(`${ this.apiUrl }`, formData);
    }

    public getFileById(id: string): Observable<Blob> {
        return this._http.get(`${ this.apiUrl }/${ id }`, { responseType: 'blob' });
    }

    public deleteFile(id: string): Observable<void> {
        return this._http.delete<void>(`${ this.apiUrl }/${ id }`);
    }

    public getFileInfoById(id: string): Observable<any> {
        return this._http.get<any>(`${ this.apiUrl }/${ id }/info`);
    }
}
