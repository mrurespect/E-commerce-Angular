import {Component, EventEmitter, Output} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../auth.service";
import {NgIf} from "@angular/common";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogin:boolean=false;

  logout(){
    this._AuthService.logout();
  }
  constructor(private _AuthService:AuthService,private _CartService:CartService) {
    _AuthService.userData.subscribe({
      next:()=> this.isLogin=_AuthService.userData.getValue() !== null
    })
  }
  toggleCart() {
    this._CartService.toggleCartVisibility();
  }
}
