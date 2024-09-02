import {Component, Input, input, OnInit} from '@angular/core';
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SeemorePipe} from "../seemore.pipe";
import {SpinnerComponent} from "../spinner/spinner.component";
import {LazyLoadImageModule} from "ng-lazyload-image";

@Component({
  selector: 'app-main-slider',
  standalone: true,
  imports: [CarouselModule, NgForOf, NgIf, RouterLink, SeemorePipe, SpinnerComponent, LazyLoadImageModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css'
})

export class MainSliderComponent implements OnInit{

   productImages:string[]=[];
   products:Product[]=[];


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
      }
    },
    nav: true
  }

 constructor(private _ProductService:ProductService) {

 }
  ngOnInit(): void {
    this._ProductService.getProducts().subscribe((pr:Product[])=>{
      this.products=pr;
      //this.productImages=pr.map((p:Product) => {
      //  return p?.imageURL;
      //});
    })
  }

}
