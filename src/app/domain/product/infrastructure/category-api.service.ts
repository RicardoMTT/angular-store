import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategoryApiService } from './category-api.interface';
import { IDomainRequestCategory } from '../domain/category.model';
import { IApiResponseCategory } from './models/category-api.model';

@Injectable()
export class CategoryApiService implements ICategoryApiService {
  private baseUrl: string = 'https://api-store-backend-nestjs.onrender.com';
  private baseLocalUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<IDomainRequestCategory[]> {
    return this.http.get<IApiResponseCategory[]>(
      `${this.baseLocalUrl}/category`
    );
  }
}
