import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePage } from './pages/profile/profile-page.component';
import { CheckboxItemComponent } from './components/checkbox-item/checkbox-item.component';

const routes: Routes = [
    {
        path: '',
        component: ProfilePage,
    },
];

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [ProfilePage, CheckboxItemComponent],
})
export class ProfileModule {
}
