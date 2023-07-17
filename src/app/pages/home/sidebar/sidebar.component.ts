import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [],
})
export class SidebarComponent {
  toggleAside = false;
  toggleAsideAnimation = false;
  display: string = '';
  isSidebarVisible: boolean = false;

  constructor(private cartService: CartService) {
    this.cartService.sidebarVisible.subscribe((visible: boolean) => {
      this.isSidebarVisible = visible;
      this.display = 'block';
      this.toggleAsideAnimation = false;
    });
  }

  closeEvent(e: any) {
    this.toggleAsideAnimation = !this.toggleAsideAnimation;
    setTimeout(() => {
      this.cartService.toggleSidebar();
      this.toggleAside = false;
      this.display = !this.toggleAside ? 'none' : 'block';
    }, 700);
  }
}
