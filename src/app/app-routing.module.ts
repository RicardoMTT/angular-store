import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartViewComponent } from './pages/cart/cart-view/cart-view.component';
import { CaptureOrderComponent } from './pages/cart/capture-order/capture-order.component';
import { LayoutComponent } from './layout/layout.component';
/**
 * Component Layout
 * Ayudan a organizar la estructura general de la página. Los componentes de "Layout" pueden contener
 * encabezados, pies de página, barras laterales y otras secciones que son COMUNES en todas o
 * en la mayoría de las páginas de la aplicación. Esto facilita la gestión de la estructura y
 * la navegación de la aplicación.
 */
const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
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
      // {
      //   path: 'cart',
      //   component: CartViewComponent,
      // },
      // {
      //   path: 'capture-order',
      //   component: CaptureOrderComponent,
      // },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then(
        (m) => m.AuthModule
      ),
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
