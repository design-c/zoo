import { filter, map, Observable, startWith } from 'rxjs';
import { ICabinetState } from '../interfaces/cabinet-state.interface';
import { CABINET_STATE } from '../cabinet-state.const';
import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class FormStateService extends Observable<ICabinetState> {

    private _router: Router = inject(Router);

    private _active$: Observable<ICabinetState> = this._router.events
        .pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.getActiveRouteState()),
            startWith(this.getActiveRouteState())
        );

    constructor() {
        super((subscriber) => this._active$.subscribe(subscriber));
    }

    public getState(route: keyof typeof CABINET_STATE): ICabinetState {
        return CABINET_STATE[route];
    }

    private getActiveRouteState(): ICabinetState {
        const activeRoute = this._router.url.split('/').pop() as keyof typeof CABINET_STATE;
        return this.getState(activeRoute);
    }
}
