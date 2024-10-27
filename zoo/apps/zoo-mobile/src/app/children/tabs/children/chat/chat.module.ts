import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChatPage } from './pages/chat/chat-page.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { TuiIcon } from '@taiga-ui/core';

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
        ReactiveFormsModule,
        TuiIcon
    ],
    declarations: [ChatPage, ChatInputComponent],
})
export class ChatModule {
}
