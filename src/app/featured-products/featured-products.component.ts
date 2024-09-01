import {Component, Input, ViewChild} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {SearchPipe} from "../search.pipe";
import {SeemorePipe} from "../seemore.pipe";
import {Product} from "../product";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {buildApplication} from "@angular-devkit/build-angular";
import {CartService} from "../cart.service";
import {ToastComponent} from "../toast/toast.component";
import {WishlistService} from "../wishlist.service";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    SearchPipe,
    SeemorePipe,
    RouterLink,
    FormsModule,
    NgIf,
    ToastComponent
  ],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})

export class FeaturedProductsComponent {
  @Input() products:Product[]=[];
  searchTerm:string="";
  @Input() name ="";
  constructor(private _CartService:CartService,private _WishlistService:WishlistService) {  }

  @ViewChild(ToastComponent) toast!: ToastComponent;
  addToCart(item:any) {
    this._CartService.addToCart(item)
    this.toast.showToast('item successfully added to your cart!', 3000); // Show the toast for 3 seconds
    this._CartService.toggleCartVisibility();
  }
  addToWishList(item:any) {
    this._WishlistService.addToWishList(item)
    this.toast.showToast('item successfully added to wishList!', 1000);
  }
}
