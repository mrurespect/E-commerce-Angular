import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogin:boolean=false;

  logout(){
    this._AuthService.logout();
  }
  constructor(private _AuthService:AuthService) {
    _AuthService.userData.subscribe({
      next:()=> this.isLogin=_AuthService.userData.getValue() !== null
    })
  }
}
