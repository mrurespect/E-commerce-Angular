import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {ActivatedRoute} from "@angular/router";
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
  constructor(private _ProductService:ProductService,private _ActivatedRoute:ActivatedRoute ) {
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params)=>{
      this.productId=params.get('id');
    })

    this._ProductService.getSpecificProduct(this.productId).subscribe({
    next:(data)=>{this.productDetail=data}
    })
  }
}
