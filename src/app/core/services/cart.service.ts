import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ICart {
  items: any[];
  total: number;
  totalItems: number;
}
const cart: ICart = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  total: JSON.parse(localStorage.getItem('totalPrice') || '0'),
  totalItems: JSON.parse(localStorage.getItem('totalItems') || '0'),
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl: string = 'https://api-store-backend-nestjs.onrender.com';
  private localBaseUrl: string = 'http://localhost:3000';

  private cart$: BehaviorSubject<ICart> = new BehaviorSubject<ICart>(cart);
  public cartPublic = this.cart$.asObservable();

  public isSidebarVisible: boolean;
  public sidebarVisible: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isSidebarVisible = false;
    this.sidebarVisible = new BehaviorSubject<boolean>(this.isSidebarVisible);
  }
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarVisible.next(this.isSidebarVisible);
  }
  payWithPaypal(products: any[]) {
    return this.http.post(
      `${this.localBaseUrl}/payment/create-order`,
      products
    );
  }

  captureOrder(token: any) {
    return this.http.get(
      `${this.localBaseUrl}/payment/capture-order/` + token
    );
  }

  addToCart(product: any) {
    const items = this.getValueToCart();
    const newItems = items.find((item) => item.id === product.id)
      ? items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...items, { ...product, quantity: 1 }];// : aun no esta en el carrito
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
    localStorage.setItem('cart', JSON.stringify(newItems));
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    localStorage.setItem('totalItems', JSON.stringify(totalItems + 1));
  }

  clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('totalPrice', JSON.stringify(0));
    localStorage.setItem('totalItems', JSON.stringify(0));
    this.cart$.next({
      items: [],
      total: 0,
      totalItems: 0,
    });
  }

  decreaseQuantity(product: any) {
    const items = this.getValueToCart();

    const newItems =
      items.find((item) => item.id === product.id).quantity === 1
        ? items.filter((item) => item.id !== product.id)
        : items.map((item) =>
            item.id == product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );

    const totalPrice = newItems.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    );

    // const newItems = items.find((item) => item.id === product.id)
    // ? items.map((item) =>
    //     item.id === product.id
    //       ? { ...item, quantity: item.quantity - 1 }
    //       : item
    //   ):[ ]
    // let newItems2 = newItems.filter(item => item.quantity !== 0);
    //   const totalPrice = newItems2.reduce(
    //     (total, { price, quantity }) => total + price * quantity,
    //     0
    //   );
    const totalItems = this.getTotalItems();
    this.cart$.next({
      items: newItems,
      total: totalPrice,
      totalItems: totalItems - 1,
    });
  }

  getTotalItems() {
    return this.cart$.value.totalItems;
  }

  getValueToCart() {
    return this.cart$.value.items;
  }
}
