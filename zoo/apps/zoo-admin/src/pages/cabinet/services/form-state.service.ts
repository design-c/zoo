import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormStates } from '../enums/form-states.enum';
import { FormDataService } from './form-data.service';
import { ICabinetState } from '../interfaces/cabinet-state.interface';

@Injectable({ providedIn: 'root' })
export class FormStateService extends Observable<ICabinetState> {
    public readonly states: Array<{ tab: keyof typeof FormStates, tabState: ICabinetState }> =
        inject(FormDataService).data.map(([tab, tabState]) => ({ tab, tabState }));

    public currentIndex: number = 0;

    private readonly _active$: Observable<ICabinetState> = inject(ActivatedRoute).queryParams
        .pipe(
            map(({ tab }) => this.states.findIndex((state) => state.tab === tab)),
            map((index: number) => {
                this.currentIndex = index !== -1 ? index : 0;

                return this.states[this.currentIndex].tabState;
            })
        );

    constructor() {
        super((subscriber) => this._active$.subscribe(subscriber));
    }
}
