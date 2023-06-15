import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ICart {
  items: any[];
  total: number;
  totalItems: number;
}
const cart: ICart = {
  items: [],
  total: 0,
  totalItems: 0,
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart$: BehaviorSubject<ICart> = new BehaviorSubject<ICart>(cart);
  public cartPublic = this.cart$.asObservable();

  constructor() {
  }

  addToCart(product: any) {
    const items = this.getValueToCart();
    console.log(items);
    const newItems = items.find((item) => item.id === product.id)
      ? items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...items, { ...product, quantity: 1 }];

      console.log(newItems);
      
    const totalPrice = newItems.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    );
    const totalItems = this.getTotalItems();
    this.cart$.next({
      items: newItems,
      total: totalPrice,
      totalItems: totalItems + 1,
    });
    
    console.log(items);
  }

  getTotalItems() {
    return this.cart$.value.totalItems;
  }

  getValueToCart() {
    return this.cart$.value.items;
  }
}
