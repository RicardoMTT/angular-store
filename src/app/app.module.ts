import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CartViewComponent } from './pages/cart/cart-view/cart-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './core/shell-components/footer/footer.component';
import { NavbarComponent } from './core/shell-components/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent, CartViewComponent,FooterComponent,NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
