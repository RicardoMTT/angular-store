import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrderApiService } from '../infrastructure/order-api.interface';
import { HTTP_ORDER_SERVICE } from '../infrastructure/providers/order-api.provider';

@Injectable({ providedIn: 'root' })
export class CreateOrderUseCaseService {
  constructor(
    @Inject(HTTP_ORDER_SERVICE)
    private _orderApiService: IOrderApiService
  ) {}

  createOrder(order: any): Observable<any> {
    return this._orderApiService.createOrder(order);
  }
}
