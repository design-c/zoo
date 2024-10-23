import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MainHeaderComponent } from './component/main-header/main-header.component';
import { MainPage } from './pages/main/main-page.component';
import { ExploreContainerComponentModule } from '../../../../components/explore-container/explore-container.module';
import { MainCarouselComponent } from './component/carousel/main-carousel.component';
import { NewsItemComponent } from './component/news-item/news-item.component';
import { ContactsComponent } from './component/contacts/contacts.component';

const routes: Routes = [
    {
        path: '',
        component: MainPage,
    },
];

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        RouterModule.forChild(routes),
        MainCarouselComponent,
    ],
    declarations: [MainPage, MainHeaderComponent, NewsItemComponent, ContactsComponent],
})
export class MainModule {
}
