import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, concatMap, throwError } from 'rxjs';
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
    if (!this.tokenService.isLogged()) {
      return next.handle(request);
    }
    // si esta autenticado verificamos la solicitud con el token
    const authorization = JSON.parse(
      localStorage.getItem('authorization') || ''
    );
    
    const token = authorization.access_token;

    const newRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(newRequest).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          const tokenJSON = {
            token: token,
          };

          return this.authService.refreshToken(tokenJSON).pipe(
            concatMap((data: any) => {
              const tokenJSON = {
                access_token: data.token,
              };
              this.tokenService.setToken(JSON.stringify(tokenJSON));//Actualizas con el nuevo token
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${data.token}`,
                },
              });

              return next.handle(newRequest);//Haces nuevamente la peticion, pero con el mismo token
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}
