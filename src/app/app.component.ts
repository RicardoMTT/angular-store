import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { LocationService } from './core/services/location.service';
import { TokenService } from './core/services/token.service';
import { CartService } from './core/services/cart.service';
import { SidebarComponent } from './pages/home/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  // I use viewchild to render components dinamically, no se cargan en el bundle principal para mantener el tamaño pequeño
  @ViewChild('dynamicComponentContainer', {static: true, read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef | undefined;

  showSidebar = false;
  constructor(
    public locationService: LocationService,
    private tokenService: TokenService,
    private cartService: CartService,
  ) {

    this.cartService.sidebarVisible.subscribe({
      next: (isVisible) => {
        if (isVisible) {
          // Limpiar el contenedor antes de cargar un nuevo componente
          this.dynamicComponentContainer && this.dynamicComponentContainer!.clear();
          // Crear una instancia del componente y adjuntarlo al contenedor
          this.dynamicComponentContainer!.createComponent(SidebarComponent);
        }else{
          this.dynamicComponentContainer && this.dynamicComponentContainer!.clear();
        }
      }
    })
    // const authorization = {
    //   access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjg4OTQ4MDA3LCJleHAiOjE2ODg5NDgwNTd9.19wERVX-pkyEZ2ynvJsEUP1r67EnxI1W_RGY-yw2KfI',
    // };
    // this.tokenService.setToken(JSON.stringify(authorization) as string);
    this.locationService.getLocation().subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }

}
