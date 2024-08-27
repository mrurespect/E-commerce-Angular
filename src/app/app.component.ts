import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {CarouselModule} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarouselModule,RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';
}
