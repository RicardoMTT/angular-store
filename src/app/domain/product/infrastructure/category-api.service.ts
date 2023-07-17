import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { ICategoryApiService } from './category-api.interface';
import { IDomainRequestCategory } from '../domain/category.model';
import { IApiResponseCategory } from './models/category-api.model';

@Injectable()
export class CategoryApiService implements ICategoryApiService {
    
  constructor(private http: HttpClient) {}

  getCategories(): Observable<IDomainRequestCategory[]> {
    return this.http.get<IApiResponseCategory[]>(
      'http://localhost:3000/category'
    );
  }
}
