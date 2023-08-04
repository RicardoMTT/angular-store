import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatChipsModule } from '@angular/material/chips';
import { MaterialModule } from 'src/app/material.module';
import { TrendComponent } from './trend/trend.component';
import { BannerComponent } from './banner/banner.component';
import { ClientsComponent } from './clients/clients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    TrendComponent,
    BannerComponent,
    ClientsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatChipsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
