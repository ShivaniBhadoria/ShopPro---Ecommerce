import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginRegisterComponent } from './auth-templates/login-register/login-register.component';
import { ShopProductsComponent } from './shop-products/shop-products.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent
  },
  { 
    path: 'home', component: HomeComponent  
  },
  { 
    path: 'shop', component: ShopProductsComponent 
  },
  {
    path:'product-details/:id', component: ProductDetailsComponent
  },
  { 
    path: 'wishlist', component: WishlistComponent  
  },
  { 
    path: 'cart', component: CartComponent  
  },
  {
    path:'admin-panel', component: AdminPanelComponent
  },
  {
    path:'dashboard', component: DashboardComponent
  },
  {
    path:'admin-panel/login-register', component: LoginRegisterComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
