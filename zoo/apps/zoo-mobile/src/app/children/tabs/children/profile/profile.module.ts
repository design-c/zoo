import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePage } from './pages/profile/profile-page.component';
import { CheckboxItemComponent } from './components/checkbox-item/checkbox-item.component';
import { TuiCheckbox } from '@taiga-ui/kit';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ProfileManagerService } from './services/profile-manager.service';
import PreviewImageComponent from '../../../../standalone/preview-image/preview-image.component';
import { TuiIcon } from '@taiga-ui/core';

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
        TuiCheckbox,
        PreviewImageComponent,
        TuiIcon,
    ],
    declarations: [
        ProfilePage,
        CheckboxItemComponent,
        GalleryComponent
    ],
    providers: [
        ProfileManagerService,
    ]
})
export class ProfileModule {
}
