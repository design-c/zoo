import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NativeStorageService {

    public getByKey(key: string): Observable<string | null> {
        return from(Preferences.get({key}))
            .pipe(
                map((res) => res.value)
            );
    }

    public setByKey(key: string, value: string): void {
        Preferences.set({key, value});
    }

    public removeByKey(key: string): void {
        Preferences.remove({key});
    }
}
