import { Component } from '@angular/core';
import { IUserSettings } from '../../interfaces/user-settings.interface';

@Component({
    selector: 'app-profile-page',
    templateUrl: 'profile-page.component.html',
    styleUrls: ['profile-page.component.scss'],
})
export class ProfilePage {
    protected readonly settings: IUserSettings[] = [
        { name: 'Афиша', isSelected: false },
        { name: 'Новости', isSelected: false },
        { name: 'События в зоопарке', isSelected: false },
        { name: 'Скидки', isSelected: false }
    ];

    protected readonly galleryImages: string[] = [
        'assets/jaguar.jpg',
        'assets/puma.jpg',
        'assets/tiger.jpg',
        'assets/vodonos.jfif',
        'assets/lions.jpg',
    ]
}
