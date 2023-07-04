import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnDestroy {
  id: any;
  items: any = [];
  total: number = 0;
  totalItems: number = 0;
  product$!: Observable<any>;

  producto: any;
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}
  ngOnDestroy(): void {
    console.log('a');

    this.cartService.clearCart();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.cartService.cartPublic.subscribe({
      next: (response) => {
        this.items = response.items;
        this.total = response.total;
        this.totalItems = response.totalItems;
      },
      error: (err: any) => {},
    });
    this.product$ = this.productsService.getProductById(this.id).pipe(
      tap((product: any) => {
        console.log('product', product);

        this.producto = {
          descripcion: product.data.descripcion,
          nombre: product.data.nombre,
          precio: product.data.precio,
          img: 'url',
        };
      })
    );
    // paypal
    //   .Buttons({
    //     createOrder: (data, actions) => {
    //       console.log(this.producto);

    //       return actions.order.create({
    //         purchase_units: [
    //           {
    //             description: this.producto.descripcion,
    //             amount: {
    //               currency_code: 'USD',
    //               value: this.producto.precio,
    //             },
    //             payee: {
    //               email_address: 'tricardo003@gmail.com',
    //             },
    //           },
    //         ],
    //       });
    //     },
    //     onApprove: async (data, actions) => {
    //       const order = await actions.order.capture();
    //       console.log('order', order);
    //     },
    //     onError: (err) => {
    //       console.log('err', err);
    //     },
    //   })
    //   .render(this.paypalElement.nativeElement);
  }

  payWithPaypal() {
    /* No sera necesario ya que por ahora sera un producto. */
    // var costoTotal = this.items.reduce(function (
    //   acumulador: any,
    //   producto: any
    // ) {
    //   return acumulador + producto.price * producto.quantity;
    // },
    // 0);
    const items = this.items.map((item: any) => {
      return {
        name: item.name,
        quantity: item.quantity.toString(),
        unit_amount: {
          value: item.price.toString(),
          currency_code: 'USD',
        },
      };
    });

    const orders = [
      {
        amount: {
          value: this.items[0].price,
          currency_code: 'USD',
          breakdown: {
            item_total: {
              value: items.length.toString() as string,
              currency_code: 'USD',
            },
          },
        },
        items,
      },
    ];

    this.cartService.payWithPaypal(orders).subscribe({
      next: (response: any) => {
        window.location.href = response.link;
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
