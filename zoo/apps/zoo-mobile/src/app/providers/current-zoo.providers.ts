import { CURRENT_ZOO_TOKEN } from '../tokens/current-zoo.token';
import { inject, Provider } from '@angular/core';
import { IZoo, ZooRequestService } from '../services/zoo-request.service';
import { map } from 'rxjs/operators';
import { defer, of } from 'rxjs';

export const CURRENT_ZOO_PROVIDER: Provider = {
    provide: CURRENT_ZOO_TOKEN,
    useFactory: () => {
        const zooService = inject(ZooRequestService);
        let currentZoo: null | IZoo = null

        return defer(() => currentZoo
            ? of(currentZoo)
            : zooService.getZoos(1)
                .pipe(
                    map(([zoo]) => currentZoo = zoo)
                )
        );
    }
}
