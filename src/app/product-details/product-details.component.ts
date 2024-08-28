import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../product";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})

export class ProductDetailsComponent implements OnInit{
  productId:any;
  productDetail:any;
  constructor(private _ProductService:ProductService,private _ActivatedRoute:ActivatedRoute ,private _Router:Router) {
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params)=>{
      this.productId=params.get('id');
      if (this.productId > 20 || this.productId.match("[A-Za-z]")){
        this._Router.navigate(["/notfound"])
      }
    })

    this._ProductService.getSpecificProduct(this.productId).subscribe({
    next:(data)=>{this.productDetail=data}
    })
  }
}
