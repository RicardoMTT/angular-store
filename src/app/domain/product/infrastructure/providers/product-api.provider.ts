import { InjectionToken, Provider } from '@angular/core';
import { IProductApiService } from '../product-api.interface';
import { ProductApiService } from '../product-api.service';

// Aca hacemos la inversion de dependencias

//Cuando inyectemos la interface IProductApiService, usara la clase ProductApiService
export const HTTP_PRODUCT_SERVICE = new InjectionToken<IProductApiService>(
  'ProductApiService'
);

export const PRODUCT_API_PROVIDER: Provider = {
  provide: HTTP_PRODUCT_SERVICE,
  useClass: ProductApiService,
};
