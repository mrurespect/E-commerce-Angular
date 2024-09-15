import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {BrandsComponent} from "./brands/brands.component";
import {CartComponent} from "./cart/cart.component";
import {CategoriesComponent} from "./categories/categories.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {authGuard} from "./auth.guard";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {WishlistComponent} from "./wishlist/wishlist.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProductConfigComponent} from "./product-config/product-config.component";
import {CategoryConfigComponent} from "./category-config/category-config.component";
import {DashboardMainPageComponent} from "./dashboard-main-page/dashboard-main-page.component";
import {OrderConfigComponent} from "./order-config/order-config.component";

export const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent,canActivate:[authGuard]}, // we give it an array of guards to guard the endpoint
  {path:"about",component:AboutComponent,canActivate:[authGuard]},
  {path:"wishlist",component:WishlistComponent,canActivate:[authGuard]},
  {path:"brands",component:BrandsComponent,canActivate:[authGuard]},
  {path:"productsdetails/:id",component:ProductDetailsComponent,canActivate:[authGuard],runGuardsAndResolvers: 'always' },
  {path:"categories/:name",component:CategoriesComponent,canActivate:[authGuard]},
  { path: 'categories', redirectTo: 'categories/electronics', pathMatch: 'full'},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"dashboard",component:DashboardComponent,children:[
      {path:"main",component:DashboardMainPageComponent},
      {path:"",redirectTo:"main",pathMatch:"full"},
      {path:"product",component:ProductConfigComponent},
      {path:"category",component:CategoryConfigComponent},
      {path:"order",component:OrderConfigComponent},
    ]},
  //{path:"settings",loadChildren:()=>import("./admin/routes").then(r=>r.ADMIN_ROUTES),canActivate:[authGuard]}, // group of component lazy loading
  //{path:"settings",loadChildren:()=>import('./settings/settings.module').then(mod=>mod.SettingsModule)}, //module lazy loading
  {path:"**",loadComponent:()=>import('./notfound/notfound.component').then(cp=>cp.NotfoundComponent)}, // standalone component lazy loading
];
