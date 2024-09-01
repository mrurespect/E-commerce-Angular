import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private storageKey = 'wishlist';
  private wishListSubject = new BehaviorSubject<any[]>(this.getWishListItems());
  wishList$ = this.wishListSubject.asObservable();

  getWishListItems(): any[] {
    const items = localStorage.getItem(this.storageKey);
    return items ? JSON.parse(items) : [];
  }

  addToWishList(item: any): void {
    const items = this.getWishListItems();
    const existingItem = items.find(wishListItem => wishListItem.id === item.id);

    if (existingItem) {
      return;
    } else {
      items.push(item);
      this.updateWishList(items);
    }
  }

  removeFromWishList(productId: number): void {
    const items = this.getWishListItems();
    const updatedItems = items.filter(item => item.id !== productId);
    this.updateWishList(updatedItems);
  }

  clearWishList(): void {
    localStorage.removeItem(this.storageKey);
    this.wishListSubject.next([]); // Emit empty list to subscribers
  }

  private updateWishList(items: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.wishListSubject.next(items); // Emit the updated list to subscribers
  }
}
