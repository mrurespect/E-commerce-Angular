import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {BrandsComponent} from "./brands/brands.component";
import {CartComponent} from "./cart/cart.component";
import {CategoriesComponent} from "./categories/categories.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {NotfoundComponent} from "./notfound/notfound.component";
import {authGuard} from "./auth.guard";
import {ProductDetailsComponent} from "./product-details/product-details.component";

export const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent,canActivate:[authGuard]}, // we give it an array of guards to guard the endpoint
  {path:"about",component:AboutComponent,canActivate:[authGuard]},
  {path:"brands",component:BrandsComponent,canActivate:[authGuard]},
  {path:"cart",component:CartComponent,canActivate:[authGuard]},
  {path:"productsdetails/:id",component:ProductDetailsComponent,canActivate:[authGuard]},
  {path:"categories",component:CategoriesComponent,canActivate:[authGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"**",component:NotfoundComponent},
];
