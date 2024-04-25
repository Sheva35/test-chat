import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { ChatService } from '../chat.service';
import { MessageComponent, TMessage } from '../message/message.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MessageComponent,
        SideBarComponent,
    ],
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    messages: TMessage[] = [];
    typingMessage: string = '';
    tabId!: string;
    messageForm: FormGroup;

    constructor(private chatService: ChatService, private fb: FormBuilder) {
        this.messageForm = this.fb.group({
            message: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.tabId = sessionStorage.getItem('tabId') || '1';

        this.chatService.messages.subscribe((messages: any) => {
            this.messages = messages;
        });

        this.chatService.typing.subscribe(typing => {
            this.typingMessage = typing;
        });

        window.addEventListener('storage', this.handleStorageChange);
    }

    ngOnDestroy(): void {
        window.removeEventListener('storage', this.handleStorageChange);
    }

    handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'messages') {
            this.messages = JSON.parse(event.newValue || '[]');
        }
        if (event.key === 'typing') {
            this.typingMessage = event.newValue || '';
        }
    }

    sendMessage(): void {
        if (this.messageForm.valid) {
            const message = this.messageForm.controls['message'].value;
            this.chatService.sendMessage(message, this.tabId);
            this.messageForm.reset();
        }
    }

    onKey(event: any): void {
        this.chatService.setTyping(`Вкладка №${this.tabId} печатает...`);
        setTimeout(() => {
            this.chatService.setTyping('');
        }, 2000);
    }
}
