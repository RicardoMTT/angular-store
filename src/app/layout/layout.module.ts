import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { SidebarComponent } from "../pages/home/sidebar/sidebar.component";
import { CartViewComponent } from "../pages/cart/cart-view/cart-view.component";
import { FooterComponent } from "../core/shell-components/footer/footer.component";
import { NavbarComponent } from "../core/shell-components/navbar/navbar.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared.module";

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  providers: [


  ],
  declarations: [
    LayoutComponent,
    CartViewComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  exports: [
    LayoutComponent,
    CartViewComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  entryComponents: [  ]
})
export class LayoutModule { }
