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
    ]
}];
