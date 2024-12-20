import { Component, inject } from '@angular/core';
import { IUserSettings } from '../../interfaces/user-settings.interface';
import { ProfileManagerService } from '../../services/profile-manager.service';
import { Observable } from 'rxjs';
import { GalleryImageModel } from '../../models/gallery-image.model';

@Component({
    selector: 'app-profile-page',
    templateUrl: 'profile-page.component.html',
    styleUrls: ['profile-page.component.scss'],
})
export class ProfilePage {

    protected readonly profileManager: ProfileManagerService = inject(ProfileManagerService);

    protected readonly settings: IUserSettings[] = [
        { name: 'Афиша', isSelected: false },
        { name: 'Новости', isSelected: false },
        { name: 'События в зоопарке', isSelected: false },
        { name: 'Скидки', isSelected: false }
    ];

    protected readonly galleryImages$: Observable<GalleryImageModel[]> = this.profileManager.getAnimals();
}
