import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../cart.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {BehaviorSubject} from "rxjs";
import {SeemorePipe} from "../seemore.pipe";
import {DollarToDhPipe} from "../dollar-to-dh.pipe";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    SeemorePipe,
    DollarToDhPipe,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  animations: [
    trigger('slideInOut', [
      state('void', style({ transform: 'translateX(100%)', opacity: 0 })),
      transition(':enter', [
        animate('300ms ease-in', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class CartComponent implements OnInit{
  cartItems:any[]=[];
  constructor(private _CartService:CartService,private _Router:Router) {  }

  ngOnInit(): void {
    this._CartService.getCartVisibility().subscribe(visible => {
      this.isVisible = visible;
      this.cartItems=this._CartService.getCartItems();
    });
  }

  toggleVisibility(){
    this._CartService.toggleCartVisibility();
  }

  protected readonly transition = transition;
  isVisible = false;


  increase(item: any) {
    if (item.quantity<10){
      item.quantity++;
      this._CartService.addProductQuantity(item.id);
    }
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this._CartService.decreaseProductQuantity(item.id);
    }
  }

  onNavigate(productId: number) {
    this._Router.navigate(['/home']).then(() => {
      this.toggleVisibility();
      this._Router.navigate(['/productsdetails', productId]);
    });
  }


}
