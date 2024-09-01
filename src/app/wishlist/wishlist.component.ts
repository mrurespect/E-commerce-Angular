import {Component, OnInit, ViewChild} from '@angular/core';
import {CartService} from "../cart.service";
import {Router} from "@angular/router";
import {ToastComponent} from "../toast/toast.component";
import {WishlistService} from "../wishlist.service";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {DollarToDhPipe} from "../dollar-to-dh.pipe";
import {SeemorePipe} from "../seemore.pipe";

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    CurrencyPipe,
    DollarToDhPipe,
    NgForOf,
    NgIf,
    SeemorePipe,
    ToastComponent
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{
  wishList:any[]=[];
  constructor(private _WishListService:WishlistService,private _Router:Router) {  }

  ngOnInit(): void {
    this.wishList=this._WishListService.getWishListItems();
  }

  @ViewChild(ToastComponent) toast! :ToastComponent;
  removeItem(item: any) {
    this._WishListService.removeFromWishList(item.id);
    this.refreshCartItems();
    this.toast.showToast('Item successfully deleted!', 1500,"error");
  }
  refreshCartItems() {
    this.wishList = this._WishListService.getWishListItems();
  }


  onNavigate(productId: number) {
    this._Router.navigate(['/home']).then(() => { // just to force navigation if we are already in productsdetails
      this._Router.navigate(['/productsdetails', productId]);
    });
  }

}
