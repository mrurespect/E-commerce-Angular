import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey='cart';
  getCartItems(){
    const items =localStorage.getItem(this.storageKey);
    return items ?JSON.parse(items) : []
  }

  addToCart(item: any): void {
    const items:any[] = this.getCartItems();
    const existingItem = items.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      if (existingItem.quantity===10)return
      existingItem.quantity += 1; // Increase quantity if item already exists

    } else {
      item.quantity = 1; // Initialize quantity if it's a new item
      items.push(item);  // Add new item to the cart
    }

    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  removeFromCart(productId: number): void {
    const items:any[]  = this.getCartItems();
    const updatedItems = items.filter(item => item.id !== productId);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedItems));
  }
  clearCart(){
    localStorage.removeItem(this.storageKey);
  }
  addProductQuantity(productId: number): void {
    const items: any[] = this.getCartItems();
    const updatedItems = items.map(item => {
      if (item.id === productId) {
        item.quantity = item.quantity ? item.quantity + 1 : 1;
      }
      return item;  // Ensure the modified item is returned
    });

    localStorage.setItem(this.storageKey, JSON.stringify(updatedItems));
  }

  decreaseProductQuantity(productId: number): void {
    const items: any[] = this.getCartItems();
    const updatedItems = items.map(item => {
      if (item.id === productId) {
        item.quantity = item.quantity ? item.quantity - 1 : 1;
        if (item.quantity < 1) item.quantity = 1;  // Ensure quantity doesn't go below 1
      }
      return item;
    });

    localStorage.setItem(this.storageKey, JSON.stringify(updatedItems));
  }
  getTotalCartPrice(): number {
    let total = 0;
    const items: any[] = this.getCartItems();
    items.forEach(item => {
      total += item.price * (item.quantity || 1);
    });
    return total;
  }

  private cartVisibility = new BehaviorSubject<boolean>(false);

  getCartVisibility() {
    return this.cartVisibility.asObservable();
  }

  toggleCartVisibility() {
    this.cartVisibility.next(!this.cartVisibility.value);
    if (this.cartVisibility.value) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
}
