import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrderApiService } from './order-api.interface';

@Injectable()
export class OrderApiService implements IOrderApiService {

  private baseUrl: string = 'https://api-store-backend-nestjs.onrender.com';
  private localBaseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createOrder(order:any): Observable<any> {
    return this.http.post<any>(`${this.localBaseUrl}/order-detail/store`,order)
  }


}
