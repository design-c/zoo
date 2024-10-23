import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MainPage } from './pages/main/main-page.component';
import { ExploreContainerComponentModule } from '../../../../components/explore-container/explore-container.module';
import { MainCarouselComponent } from './components/carousel/main-carousel.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { ContactsComponent } from './components/contacts/contacts.component';

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
