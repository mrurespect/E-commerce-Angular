import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "./product";

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[],searchTerm:string): Product[] {
    return products.filter((product)=>product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}
