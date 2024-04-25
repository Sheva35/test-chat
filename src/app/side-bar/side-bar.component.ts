import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav'; 

@Component({
    selector: 'app-side-bar',
    standalone: true,
    imports: [
        MatSidenavModule,
    ],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
    protected tabId!: string;

    ngOnInit(): void {
        this.tabId = localStorage.getItem('tabId') || '0';
    }
}
