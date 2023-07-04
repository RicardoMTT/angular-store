import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { CartViewComponent } from './pages/cart/cart-view/cart-view.component';
import { CaptureOrderComponent } from './pages/cart/capture-order/capture-order.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'product-details/:id',

        loadChildren: () =>
          import('./pages/product-details/product-details.module').then(
            (m) => m.ProductDetailsModule
          ),
      },
      {
        path:'cart',
        component:CartViewComponent
      },
      {
        path:'capture-order',
        component:CaptureOrderComponent
      },
      {
        path:'search',
        component:SearchComponent
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
