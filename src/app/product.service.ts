import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private _HttpClient:HttpClient) { }
  getProducts():Observable<any>{
     return this._HttpClient.get("https://fakestores.onrender.com/api/products");
  }
  getSpecificProduct(id:number):Observable<any>{
     return this._HttpClient.get("https://fakestores.onrender.com/api/products/"+id);
  }
}
