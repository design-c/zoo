import { Routes } from '@angular/router';
import { CabinetLayoutComponent } from './components/cabinet-layout/cabinet-layout.component';

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
            loadComponent: () => import('./pages/zoo-form/zoo-form.component').then(m => m.ZooFormComponent)
        },
        {
            path: 'faq',
            loadComponent: () => import('./pages/faq-form/faq-form.component').then(m => m.FaqFormComponent)
        },
        {
            path: 'animals',
            loadComponent: () => import('./pages/animals-form/animals-form.component').then(m => m.AnimalsFormComponent)
        },
    ]
}];
