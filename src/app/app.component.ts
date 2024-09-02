import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {CarouselModule} from "ngx-owl-carousel-o";
import {FooterComponent} from "./footer/footer.component";
import {CartComponent} from "./cart/cart.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SpinnerComponent} from "./spinner/spinner.component";
import {LoadingService} from "./loading.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarouselModule, RouterOutlet, NavbarComponent, FooterComponent, CartComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ecommerce';
   isCartVisible = false;

  toggleCartVisibility() {
    this.isCartVisible = !this.isCartVisible;
  }
  constructor(private router: Router, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loadingService.hide();
      }
    });
  }
}
