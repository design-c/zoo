import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChatPage } from './pages/chat/chat-page.component';
import { ExploreContainerComponentModule } from '../../../../components/explore-container/explore-container.module';

const routes: Routes = [
    {
        path: '',
        component: ChatPage,
    },
];

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        RouterModule.forChild(routes),
    ],
    declarations: [ChatPage],
})
export class ChatModule {
}
