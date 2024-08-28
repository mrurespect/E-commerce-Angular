import { Component } from '@angular/core';
import {CurrencyPipe, LowerCasePipe, NgForOf} from "@angular/common";
import {Product} from "../product";
import {ProductService} from "../product.service";
import {RouterLink} from "@angular/router";
import {MainSliderComponent} from "../main-slider/main-slider.component";
import {CategoriesComponent} from "../categories/categories.component";
import {FormsModule} from "@angular/forms";
import {FeaturedProductsComponent} from "../featured-products/featured-products.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    MainSliderComponent,
    CategoriesComponent,
    LowerCasePipe,
    CurrencyPipe,
    FormsModule,
    FeaturedProductsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products:Product[]=[];
  searchTerm:string="";

  constructor(private _ProductService:ProductService) {
    _ProductService.getProducts().subscribe({
      next:(data)=> {
        console.log(data);
        this.products=data;
      },
      error:(err)=> console.log("error getting products"+err)
    })
  }
}
