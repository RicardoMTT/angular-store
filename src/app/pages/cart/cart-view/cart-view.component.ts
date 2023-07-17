import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
})
export class CartViewComponent {
  items: any = [];
  total: number = 0;
  totalItems: number = 0;
  constructor(private cartService: CartService) {
    this.cartService.cartPublic.subscribe({
      next: (response) => {
        this.items = response.items;
        this.total = response.total;
        this.totalItems = response.totalItems;
      },
      error: (err: any) => {},
    });
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  decreaseQuantity(item: any) {
    this.cartService.decreaseQuantity(item);
  }

  payWithPaypal() {
    var costoTotal = this.items.reduce(function(acumulador:any, producto:any) {
      return acumulador + producto.price*producto.quantity;
    }, 0);
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
          value: costoTotal.toString() as string,
          currency_code: "USD",
          breakdown: {
            item_total: {
              value: items.length.toString() as string,
              currency_code: "USD",
            },
          },
        },
        items
      },
    ];

    
    this.cartService.payWithPaypal(orders).subscribe({
      next: (response: any) => {
        window.location.href = response.link;
      },
      error(err) {
        console.log(err);
        
      },
    },);
  }
}
