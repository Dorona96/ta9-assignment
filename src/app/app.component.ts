import { Component } from '@angular/core';
import { ManagementToolComponent } from "./features/managment-tool/management-tool.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ManagementToolComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Management Tool';
}
