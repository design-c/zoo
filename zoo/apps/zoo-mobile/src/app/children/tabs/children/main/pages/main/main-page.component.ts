import { Component } from '@angular/core';
import { INewsItem } from '../../interfaces/news-item.interface';

@Component({
    selector: 'app-main-page',
    templateUrl: 'main-page.component.html',
    styleUrls: ['main-page.component.scss'],
})
export class MainPage {

    protected readonly carouselImages: string[] = ['assets/osennie-kanikuly-24.jpg', 'assets/zastavka-oktyabr-24.jpg', 'assets/den-rozhdeniya-zooparka-2024-zastavka.jpg'];

    protected readonly newsItems: INewsItem[] = [
        {
            title: 'Приглашаем в участие в конкурсе',
            date: new Date('2024-10-16'),
            imageUrl: 'assets/news-1.png'
        },
        {
            title: 'Курсы повышения квалификации в Екатеринбургском зоопарке',
            date: new Date('2024-10-15'),
            imageUrl: 'assets/news-2.png'
        },
        {
            title: 'Наши юннаты в Москве',
            date: new Date('2024-10-09'),
            imageUrl: 'assets/news-3.png'
        },
        {
            title: ' Добрый урожай – зоопарку',
            date: new Date('2024-10-07'),
            imageUrl: 'assets/news-4.png'
        }
    ];
}
