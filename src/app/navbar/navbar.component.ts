import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLogin: boolean = false;
  numberOfItems: number = 0;
  wishlistCount: number = 0;
  private cartSubscription!: Subscription;
  private wishlistSubscription!: Subscription;

  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {
    this._AuthService.userData.subscribe({
      next: () => this.isLogin = this._AuthService.userData.getValue() !== null
    });
  }

  ngOnInit(): void {
    // Subscribe to cart visibility changes
    this.cartSubscription = this._CartService.getCartVisibility().subscribe(() => {
      this.numberOfItems = this._CartService.getCartItems().length;
    });

    // Subscribe to wishlist changes
    this.wishlistSubscription = this._WishlistService.wishList$.subscribe(items => {
      this.wishlistCount = items.length;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to avoid memory leaks
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.wishlistSubscription) {
      this.wishlistSubscription.unsubscribe();
    }
  }

  logout(): void {
    this._AuthService.logout();
  }

  toggleCart(): void {
    this._CartService.toggleCartVisibility();
  }
}
