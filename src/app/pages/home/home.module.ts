import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatChipsModule } from '@angular/material/chips';
import { MaterialModule } from 'src/app/material.module';
import { TrendComponent } from './trend/trend.component';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [HomeComponent, TrendComponent, BannerComponent],
  imports: [CommonModule, HomeRoutingModule,MatChipsModule,MaterialModule],
})
export class HomeModule {}
