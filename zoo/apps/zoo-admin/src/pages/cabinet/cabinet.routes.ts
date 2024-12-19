import { Routes } from '@angular/router';
import { CabinetLayoutComponent } from './components/cabinet-layout/cabinet-layout.component';

type ExtractRouteKeys<T extends Routes> = T[number]['children'] extends Routes
    ? Extract<T[number]['children'][number]['path'], string>
    : never;

export const CABINET_ROUTES: Routes = [{
    path: '',
    component: CabinetLayoutComponent,
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'zoo'
        },
        {
            path: 'zoo',
            loadComponent: () => import('./forms/zoo-form-create/zoo-form-create.component').then(m => m.ZooFormCreateComponent)
        },
        {
            path: 'faq',
            loadComponent: () => import('./forms/faq-form/faq-form.component').then(m => m.FaqFormComponent)
        },
        {
            path: 'animals',
            loadComponent: () => import('./forms/animals-form/animals-form.component').then(m => m.AnimalsFormComponent)
        },
    ]
}];

export type RouteKeys = ExtractRouteKeys<typeof CABINET_ROUTES>;
