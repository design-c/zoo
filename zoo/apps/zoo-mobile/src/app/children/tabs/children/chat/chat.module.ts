import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChatPage } from './pages/chat/chat-page.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { TuiIcon, TuiScrollbar } from '@taiga-ui/core';
import { ImageListComponent } from './components/image-list/image-list.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { FileStorageService } from './services/file-storage.service';
import { ChatService } from './services/chat.service';
import { ChatComponent } from './components/chat/chat.component';
import PreviewImageComponent from '../../../../standalone/preview-image/preview-image.component';
import { TextMessageComponent } from './components/text-message/text-message.component';
import { ImageGroupMessageComponent } from './components/image-group-message/image-group-message.component';
import { AudioMessageComponent } from './components/audio-message/audio-message.component';
import { ButtonsMessageComponent } from './components/buttons-message/buttons-message.component';

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
        TuiIcon,
        TuiScrollbar,
        PreviewImageComponent
    ],
    declarations: [
        ChatPage,
        ChatInputComponent,
        ImageListComponent,
        ImageUploadComponent,
        ChatComponent,
        TextMessageComponent,
        ImageGroupMessageComponent,
        AudioMessageComponent,
        ButtonsMessageComponent
    ],
    providers: [
        FileStorageService,
        ChatService
    ]
})
export class ChatModule {
}
