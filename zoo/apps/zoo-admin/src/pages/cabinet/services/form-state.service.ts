import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICabinetState } from '../interfaces/cabinet-state.interface';
import { CABINET_STATE } from '../cabinet-state.const';
import { ActivatedRoute } from '@angular/router';
import { FormStates } from '../enums/form-states.enum';

@Injectable()
export class FormStateService extends Observable<ICabinetState> {
    public readonly states: Array<{ tab: keyof typeof FormStates, tabState: ICabinetState }> =
        Object.entries(CABINET_STATE).map(([tab, tabState]) => ({ tab: tab as keyof typeof FormStates, tabState }));

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
