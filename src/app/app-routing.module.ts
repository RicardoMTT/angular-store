import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartViewComponent } from './pages/cart/cart-view/cart-view.component';
import { CaptureOrderComponent } from './pages/cart/capture-order/capture-order.component';

const routes: Routes = [
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
    path: 'search',

    loadChildren: () =>
      import('./pages/search/search.module').then(
        (m) => m.SearchModule
      ),
  },
  {
    path: 'cart',
    component: CartViewComponent,
  },
  {
    path: 'capture-order',
    component: CaptureOrderComponent,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
