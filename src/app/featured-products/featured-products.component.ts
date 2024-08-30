import {Component, Input} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {SearchPipe} from "../search.pipe";
import {SeemorePipe} from "../seemore.pipe";
import {Product} from "../product";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    SearchPipe,
    SeemorePipe,
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent {
  @Input() products:Product[]=[];
  searchTerm:string="";
  @Input() name ="";
  protected readonly console = console;
}
