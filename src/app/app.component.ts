import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        MatSidenavModule,
        RouterOutlet,
        ChatComponent,
        SideBarComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'chat-test';
    protected tabId!: string;

    ngOnInit(): void {
        this.tabId = localStorage.getItem('tabId') || '0';
        this.tabId = String(parseInt(this.tabId) + 1);
        localStorage.setItem('tabId', String(this.tabId))
        sessionStorage.setItem('tabId', this.tabId);
    }

    ngOnDestroy(): void {
        this.tabId = String(parseInt(this.tabId) - 1);
        localStorage.setItem('tabId', String(this.tabId))
    }
}
