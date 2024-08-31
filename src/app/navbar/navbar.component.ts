import {Component, OnInit} from '@angular/core';
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
export class NavbarComponent implements OnInit{
  isLogin:boolean=false;
  numberOfItems:number=0;
  wishlistCount:number=0;

  logout(){
    this._AuthService.logout();
  }
  constructor(private _AuthService:AuthService,private _CartService:CartService) {
    _AuthService.userData.subscribe({
      next:()=> this.isLogin=_AuthService.userData.getValue() !== null
    })
  }
  ngOnInit(): void {
    this._CartService.getCartVisibility().subscribe( ()=>{
      this.numberOfItems=this._CartService.getCartItems().length ; // update the count of items each time the visibility changes => toggle happend => cart updated (add or delete)
    });
  }
  toggleCart() {
    this._CartService.toggleCartVisibility();
  }
}
