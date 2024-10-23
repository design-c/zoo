import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'main',
                loadChildren: () =>
                    import('./children/main/main.module').then((m) => m.MainModule),
            },
            {
                path: 'chat',
                loadChildren: () =>
                    import('./children/chat/chat.module').then((m) => m.ChatModule),
            },
            {
                path: 'profile',
                loadChildren: () =>
                    import('./children/profile/profile.module').then((m) => m.ProfileModule),
            },
            {
                path: '',
                redirectTo: '/tabs/main',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: '/tabs/main',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [IonicModule, CommonModule, FormsModule, RouterModule.forChild(routes)],
    declarations: [TabsPage],
})
export class TabsPageModule {
}
