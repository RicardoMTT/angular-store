import { Component, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [],
})
export class SidebarComponent implements OnDestroy {
  toggleAside = false;
  toggleAsideAnimation = false;
  display: string = '';
  isSidebarVisible: boolean = false;

  //Cart
  itemsQuantity: number = 0;
  totalPrice: number = 0;
  items:any = [];

  constructor(private cartService: CartService) {
    this.cartService.sidebarVisible.subscribe((visible: boolean) => {
      this.isSidebarVisible = visible;
      this.display = 'block';
      this.toggleAsideAnimation = false;
    });
    this.cartService.cartPublic.subscribe({
      next: (response: any) => {
        this.items = response.items;
        this.itemsQuantity = response.totalItems;
        this.totalPrice = response.total;
      }
    })
  }
  ngOnDestroy(): void {
    console.log('on destroy');
  }

  closeEvent(e: any) {
    this.toggleAsideAnimation = !this.toggleAsideAnimation;
    setTimeout(() => {
      this.cartService.toggleSidebar();
      this.toggleAside = false;
      this.display = !this.toggleAside ? 'none' : 'block';
    }, 200);
  }

  clearCart(){
    this.cartService.clearCart();
  }

  incrementCart(product:any){
    this.cartService.addToCart(product);
  }

  decrementCart(product:any) {
    this.cartService.decreaseQuantity(product);
  }
}
