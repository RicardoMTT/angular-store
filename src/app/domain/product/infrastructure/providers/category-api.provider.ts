import { InjectionToken, Provider } from '@angular/core';
import { ICategoryApiService } from '../category-api.interface';
import { CategoryApiService } from '../category-api.service';

// Aca hacemos la inversion de dependencias

//Cuando inyectemos la interface IProductApiService, usara la clase ProductApiService
export const HTTP_CATEGORY_SERVICE = new InjectionToken<ICategoryApiService>(
  'CategoryApiService'
);

export const CATEGORY_API_PROVIDER: Provider = {
  provide: HTTP_CATEGORY_SERVICE,
  useClass: CategoryApiService,
};
