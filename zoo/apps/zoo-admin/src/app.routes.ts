import { Route } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Route[] = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cabinet'
    },
    {
        path: 'cabinet',
        loadChildren: () => import('./pages/cabinet/cabinet.routes').then(m => m.CABINET_ROUTES),
        canActivate: [AuthGuard]
    },
];
