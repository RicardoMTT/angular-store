import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { CreateOrderUseCaseService } from 'src/app/domain/order/application/create-order-use-case.service';
import { GetProductByIdUseCaseService } from 'src/app/domain/product/application/get-product-by-id';

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
  data: any;


  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private getProductByIdUseCaseService:GetProductByIdUseCaseService,
    private createOrderUseCaseService:CreateOrderUseCaseService
  ) {}

  ngOnDestroy(): void {
    // this.cartService.clearCart();
  }

  ngOnInit(): void {

    // Acceder a los parámetros de la URL actual
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProductDetails(id);
      }
    })


    this.cartService.cartPublic.subscribe({
      next: (response) => {
        this.items = response.items;
        this.total = response.total;
        this.totalItems = response.totalItems;
      },
      error: (err: any) => {},
    });
    // this.product$ = this.productsService.getProductById(this.id).pipe(
    //   tap((product: any) => {

    //     this.producto = {
    //       descripcion: product.data.descripcion,
    //       nombre: product.data.nombre,
    //       precio: product.data.precio,
    //       img: 'url',
    //     };
    //   })
    // );
    // paypal
    //   .Buttons({
    //     createOrder: (data, actions) => {
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
    //     },
    //     onError: (err) => {
    //       console.log('err', err);
    //     },
    //   })
    //   .render(this.paypalElement.nativeElement);
  }

  private loadProductDetails(id: string): void {
    this.product$ = this.getProductByIdUseCaseService.getProductById(id);
  }

  createOrder(item:any){
    const items = this.items.map((item: any) => {
      return {
        productId: item.id,
        quantity: item.quantity,
        price:item.price
      };
    });
    const order = {
      shipping_details:"Llegara en 5 dias.",
      items,
      total:item.price,
      subtotal:item.price
    }
    this.createOrderUseCaseService.createOrder(order).subscribe({
      next: (data) => {
        console.log('data', data);
      },
      error: (err) => {
        console.log(err);

      }
    });
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

  addToCart() {
    this.product$.subscribe({
      next: (product) => {
        console.log(product);

        this.cartService.addToCart(product);
      }
    })
  }
}
