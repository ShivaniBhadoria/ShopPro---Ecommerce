import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginRegisterComponent } from './auth-templates/login-register/login-register.component';
import { ShopProductsComponent } from './shop-products/shop-products.component';
import { FiltersComponent } from './shop-products/filters/filters.component';
import { ProductListComponent } from './shop-products/product-list/product-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductService } from './services/product-list-data.service';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminPanelComponent,
    LoginRegisterComponent,
    ShopProductsComponent,
    FiltersComponent,
    ProductListComponent,
    WishlistComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    ProductService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
