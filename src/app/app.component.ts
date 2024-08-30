import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {CarouselModule} from "ngx-owl-carousel-o";
import {FooterComponent} from "./footer/footer.component";
import {CartComponent} from "./cart/cart.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarouselModule, RouterOutlet, NavbarComponent, FooterComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';
   isCartVisible = false;

  toggleCartVisibility() {
    this.isCartVisible = !this.isCartVisible;
  }
}
