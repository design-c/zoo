import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly _tokenKey: string = 'access_token';
    private readonly _apiUrl: string = '/api/auth';
    private readonly _http: HttpClient = inject(HttpClient);

    // Метод для авторизации
    login(login: string, password: string): Observable<any> {
        const body = { login, password };
        return this._http
            .post<any>(`${ this._apiUrl }/login`, body, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            });
    }

    setToken(token: string): void {
        localStorage.setItem(this._tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this._tokenKey);
    }

    removeToken(): void {
        localStorage.removeItem(this._tokenKey);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}
