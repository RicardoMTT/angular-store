import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProductDetailsComponent } from './product-details.component';
import { ProductDetailsRoutingModule } from './product-details-routing';



@NgModule({
  declarations: [ 
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule
  ]
})
export class ProductDetailsModule { }
