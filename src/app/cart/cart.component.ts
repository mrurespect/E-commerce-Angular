import {Component, OnInit, ViewChild} from '@angular/core';
import {CartService} from "../cart.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {SeemorePipe} from "../seemore.pipe";
import {DollarToDhPipe} from "../dollar-to-dh.pipe";
import {Router, RouterLink} from "@angular/router";
import {ToastComponent} from "../toast/toast.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    SeemorePipe,
    DollarToDhPipe,
    CurrencyPipe,
    RouterLink,
    ToastComponent
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
  @ViewChild(ToastComponent) toast! :ToastComponent;
  removeItem(item: any) {
    this._CartService.removeFromCart(item.id);
    this.refreshCartItems();
    this.toast.showToast('Item successfully deleted!', 1500,"error");
  }
  refreshCartItems() {
    this.cartItems = this._CartService.getCartItems();
  }


  onNavigate(productId: number) {
    this._Router.navigate(['/home']).then(() => { // just to force navigation if we are already in productsdetails
      this.toggleVisibility();
      this._Router.navigate(['/productsdetails', productId]);
    });
  }
}
