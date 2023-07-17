import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartViewComponent } from './pages/cart/cart-view/cart-view.component';
import { FooterComponent } from './core/shell-components/footer/footer.component';
import { NavbarComponent } from './core/shell-components/navbar/navbar.component';
import { PRODUCT_API_PROVIDER } from './domain/product/infrastructure/providers/product-api.provider';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { CATEGORY_API_PROVIDER } from './domain/product/infrastructure/providers/category-api.provider';

@NgModule({
  declarations: [
    AppComponent,
    CartViewComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PRODUCT_API_PROVIDER, CATEGORY_API_PROVIDER,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
