import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ProductsService } from 'src/app/core/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  id:any;
  product$!: Observable<any>;
  producto:any;
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.product$ = this.productsService.getProduct(this.id).pipe(
      tap((product:any) => {
        console.log('product', product);
        
        this.producto = {
          descripcion: product[0].descripcion,
          nombre: product[0].nombre,
          precio: product[0].precio,
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
}
