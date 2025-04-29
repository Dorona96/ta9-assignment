import { Component } from '@angular/core';
import { ManagmentToolComponent } from "./features/managment-tool/management-tool.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ManagmentToolComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Management Tool';
}
