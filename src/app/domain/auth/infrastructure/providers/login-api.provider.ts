import { InjectionToken, Provider } from '@angular/core';
import { ILoginApiService } from '../login-api.interface';
import { LoginApiService } from '../login-api.service';

// Aca hacemos la inversion de dependencias.
// Permite que cuando se solicite la interfaz ILoginApiService en otras partes de la aplicación,
// se proporcione una instancia de LoginApiService como su implementación concreta.
// Esto facilita la modularidad y la gestión de dependencias en la aplicación Angular.

//Cuando inyectemos la interface ILoginApiService, usara la clase LoginApiService
export const HTTP_LOGIN_SERVICE = new InjectionToken<ILoginApiService>(
  'LoginApiService'
);

export const LOGIN_API_PROVIDER: Provider = {
  provide: HTTP_LOGIN_SERVICE,
  useClass: LoginApiService,//la clase concreta que se debe utilizar como implementacion de la interfaz
};
