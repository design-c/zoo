import { Component } from '@angular/core';
import {register} from 'swiper/element/bundle';

register();
@Component({
    selector: 'zoo-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor() {
    }
}