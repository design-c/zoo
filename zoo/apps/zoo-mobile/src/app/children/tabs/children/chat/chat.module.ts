import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChatPage } from './pages/chat/chat-page.component';

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
        RouterModule.forChild(routes),
    ],
    declarations: [ChatPage],
})
export class ChatModule {
}
