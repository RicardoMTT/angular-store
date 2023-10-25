import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PRODUCT_API_PROVIDER } from './domain/product/infrastructure/providers/product-api.provider';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { CATEGORY_API_PROVIDER } from './domain/product/infrastructure/providers/category-api.provider';
import { ORDER_API_PROVIDER } from './domain/order/infrastructure/providers/order-api.provider';
import { ToastrModule } from 'ngx-toastr';
import { LOGIN_API_PROVIDER } from './domain/auth/infrastructure/providers/login-api.provider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),

  ],
  providers: [PRODUCT_API_PROVIDER, CATEGORY_API_PROVIDER,LOGIN_API_PROVIDER,ORDER_API_PROVIDER,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
