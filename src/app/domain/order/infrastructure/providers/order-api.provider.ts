import { InjectionToken, Provider } from '@angular/core';
import { IOrderApiService } from '../order-api.interface';
import { OrderApiService } from '../order-api.service';

// Aca hacemos la inversion de dependencias

//Cuando inyectemos la interface IOrderApiService, usara la clase OrderApiService
export const HTTP_ORDER_SERVICE = new InjectionToken<IOrderApiService>(
  'OrderApiService'
);

export const ORDER_API_PROVIDER: Provider = {
  provide: HTTP_ORDER_SERVICE,
  useClass: OrderApiService,
};
