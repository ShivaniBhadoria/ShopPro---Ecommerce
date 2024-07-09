import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginRegisterComponent } from './auth-templates/login-register/login-register.component';
import { ShopProductsComponent } from './shop-products/shop-products.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent
  },
  { path: 'home', component: HomeComponent 
    
  },
  { path: 'shop', component: ShopProductsComponent 
    
  },
  { path: 'wishlist', component: WishlistComponent 
    
  },
  {
    path:'admin-panel', component: AdminPanelComponent
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
