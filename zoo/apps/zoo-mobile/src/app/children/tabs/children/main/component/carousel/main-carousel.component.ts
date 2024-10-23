import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-main-carousel',
    templateUrl: './main-carousel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['main-carousel.component.scss'],
    standalone: true,
    imports: [CommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainCarouselComponent {

    @Input()
    public images: string[] = [];

    protected readonly swiperModules = [IonicSlides];

}
