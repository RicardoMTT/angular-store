import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, concatMap, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';


/*
  Permite interceptar las solicitudes HTTP antes de ser enviadas y manipularlas.
*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    /*
      |-----------------------------------------------------------------------------
      | Api Public
      |-----------------------------------------------------------------------------
    */
    if (this.isPublicApi(request)) {
      const headers = {};
      const backendRequest = request.clone({
        setHeaders: headers,
      });
      return next.handle(backendRequest);
    }
    /*
      |-----------------------------------------------------------------------------
      | Api Private
      |-----------------------------------------------------------------------------
    */
    // si esta autenticado verificamos la solicitud con el token
    const authorization = JSON.parse(
      localStorage.getItem('authorization') || '{}'
    );

    const token = authorization.access_token;

    const newRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(newRequest).pipe(
      catchError((error: any) => {
        console.log('error: ' ,error);

        if (error.status === 401) {
          const tokenJSON = {
            token: token,
          };

          return this.authService.refreshToken(tokenJSON).pipe(
            concatMap((data: any) => {
              return this.handleTokenRefresh(data.token,request,next);
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }


  private isPublicApi(request: HttpRequest<unknown>): boolean {
    // Verificar si la URL corresponde a una API pública
    return request.url.includes('/category') || request.url.includes('/products');
  }

  private handleTokenRefresh(token: string, request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenJSON = { access_token: token };
    this.tokenService.setToken(JSON.stringify(tokenJSON));
    const newRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(newRequest);
  }
}
