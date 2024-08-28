import {Route} from "@angular/router";
import {BrandsComponent} from "../brands/brands.component";
import {CartComponent} from "../cart/cart.component";

export const ADMIN_ROUTES: Route[] = [
  {path: 'brands', component: BrandsComponent},
  {path: 'cart', component: CartComponent},
];
