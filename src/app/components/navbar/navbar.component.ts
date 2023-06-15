import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from 'src/app/core/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentRoute: any;

  constructor(private cartService:CartService, private router:Router){
   console.log(this.router.url);
   this.currentRoute = this.router.url;
    this.cartService.cartPublic.subscribe({
      next: (data) => {
        console.log(data);
        
      }
    })
  }
}
