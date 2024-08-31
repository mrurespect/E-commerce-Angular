import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../product.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CurrencyPipe, JsonPipe, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {DollarToDhPipe} from "../dollar-to-dh.pipe";
import {SeemorePipe} from "../seemore.pipe";
import {CartService} from "../cart.service";
import {ToastComponent} from "../toast/toast.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    JsonPipe,
    NgForOf,
    NgIf,
    DollarToDhPipe,
    RouterLink,
    SeemorePipe,
    TitleCasePipe,
    ToastComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})

export class ProductDetailsComponent implements OnInit{
  productId:any;
  productDetail:any;
  numOfStars: any[] = [];
  halfStar =false;
  original:boolean=false;

  constructor(private _ProductService:ProductService,private _ActivatedRoute:ActivatedRoute ,private _Router:Router,private _CartService:CartService) {
  }

  @ViewChild(ToastComponent) toast!:ToastComponent;
  addToCart(item:any){
    this._CartService.addToCart(item)
    this.toast.showToast('Item successfully added to your cart!', 3000);
    this._CartService.toggleCartVisibility()
  }

  seemore(){
    this.original=true;
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params)=>{
      this.productId=params.get('id');
      if (this.productId > 20 || this.productId.match("[A-Za-z]")){
        this._Router.navigate(["/notfound"])
      }
    })

    this._ProductService.getSpecificProduct(this.productId).subscribe({
    next:(data)=>{
      this.productDetail=data ;
      let rating =this.productDetail.rating
      this.halfStar= rating%1 !==0
      this.numOfStars = Array( rating-rating %1);
    }
    })
  }

  protected readonly console = console;
}
