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
import { NewsletterComponent } from './newsletter/newsletter.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { SharedModule } from 'src/app/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    HomeComponent,
    TrendComponent,
    BannerComponent,
    ClientsComponent,
    NewsletterComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatChipsModule,
    MaterialModule,
    LayoutModule,
    SharedModule,
    InfiniteScrollModule
  ],
})
export class HomeModule {}
