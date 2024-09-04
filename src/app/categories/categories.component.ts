import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from "../product.service";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {Product} from "../product";
import {FeaturedProductsComponent} from "../featured-products/featured-products.component";
import {SpinnerComponent} from "../spinner/spinner.component";
import {LazyLoadImageModule} from "ng-lazyload-image";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CarouselModule, NgIf, RouterLink, NgForOf, FeaturedProductsComponent, TitleCasePipe, SpinnerComponent, LazyLoadImageModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: string[] = [];
  @Input() show: boolean = true;
  name: string = "electronics";
  productsByCat:Product[]=[];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<span><i class="fa-solid fa-chevron-left"></i></span>', '<span><i class="fa-solid fa-chevron-right"></i></span>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true
  };

  constructor(private _ProductService: ProductService, private route: ActivatedRoute,private _Router:Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.name = params['name'] || 'electronics';

      this._ProductService.getProductsByCategory(this.name).subscribe((data)=>{
        this.productsByCat=data

    });

    this._ProductService.getCategories().subscribe((data) => {
      this.categories = data;
      if (!this.categories.includes(this.name)) {
        this._Router.navigate(['/categories', 'electronics']); // /categories/electronics ,or simply we can navigate to /categories
      }
      })
    });
  }
}
