import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../cart.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NgIf} from "@angular/common";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgIf
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
  constructor(private _CartService:CartService) {  }

  ngOnInit(): void {
    this.cartItems=this._CartService.getCartItems();
    this._CartService.getCartVisibility().subscribe(visible => {
      this.isVisible = visible;
    });
  }

  toggleVisibility(){
    this._CartService.toggleCartVisibility();
  }

  protected readonly transition = transition;
  isVisible = false;
}
