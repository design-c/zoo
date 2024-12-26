import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { map } from 'rxjs/operators';

interface AuthResponse {
    accessToken: string;
}

@Injectable()
export class AuthService {

    private readonly _apiUrl: string = '/api/auth';

    constructor(private http: HttpClient) {
    }

    public register(login: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${ this._apiUrl }/register`,
            { login, password, role: 'user' }
        );
    }

    public login(login: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${ this._apiUrl }/login`,
            { login, password }
        );
    }

    public saveToken(token: string): Observable<void> {
        return from(Preferences.set({ key: 'auth_token', value: token }));
    }

    public getToken(): Observable<string | null> {
        return from(Preferences.get({ key: 'auth_token' }))
            .pipe(
                map(result => result.value)
            );
    }

    public logout(): Observable<void> {
        return from(Preferences.remove({ key: 'auth_token' }));
    }

    public isAuthenticated(): Observable<boolean> {
        return this.getToken().pipe(map(token => token !== null));
    }
}
