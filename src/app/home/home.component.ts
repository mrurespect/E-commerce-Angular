import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {Product} from "../product";
import {ProductService} from "../product.service";
import {RouterLink} from "@angular/router";
import {MainSliderComponent} from "../main-slider/main-slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    MainSliderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products:Product[]=[];

  constructor(private _ProductService:ProductService) {
    _ProductService.getProducts().subscribe({
      next:(data)=> {
        console.log(data);
        this.products=data;
      },
      error:(err)=> console.log("error getting products")
    })
  }
}
