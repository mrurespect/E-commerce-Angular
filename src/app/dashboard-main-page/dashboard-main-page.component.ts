import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard-main-page',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './dashboard-main-page.component.html',
  styleUrl: './dashboard-main-page.component.css'
})
export class DashboardMainPageComponent {

}
