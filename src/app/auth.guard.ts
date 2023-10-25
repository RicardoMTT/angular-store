import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isLoginRoute = state.url === '/auth';
    const token = localStorage.getItem('user');

    if (token) {
      console.log('1');

      if (isLoginRoute) {
        return this.router.createUrlTree(['/']);
      }else{
        return true;
      }
    }else {
      console.log('2');

      // Redireccionar al usuario a una página de inicio de sesión o mostrar un mensaje de error
      return this.router.createUrlTree(['/auth']);
    }
    return true;
  }

}
