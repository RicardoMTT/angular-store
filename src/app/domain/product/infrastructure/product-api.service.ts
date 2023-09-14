import { BehaviorSubject, Observable, map, of } from 'rxjs';
import {
  IDomainRequestProduct,
  IDomainResponseProduct,
} from '../domain/product.model';
import { IProductApiService } from './product-api.interface';
import { HttpClient } from '@angular/common/http';
import { IApiResponseProduct } from './models/product-api.model';
import { Injectable } from '@angular/core';

export interface PaginationFront{
  limit:number;
  page:number;
  categoryId?:any,
}

@Injectable()
export class ProductApiService implements IProductApiService {

  private baseUrl: string = 'https://api-store-backend-nestjs.onrender.com';
  private baseLocalUrl: string = 'http://localhost:3000';
  private products$: BehaviorSubject<IApiResponseProduct[]> = new BehaviorSubject<IApiResponseProduct[]>([]);
  public productsPublic = this.products$.asObservable();


  constructor(private http: HttpClient) {}

  getProductById(idProduct: any): Observable<IDomainRequestProduct> {
    return this.http
      .get<IDomainResponseProduct>(
        `${this.baseLocalUrl}/products/` + idProduct
      )
      .pipe(
        map((product) => ({
          id: product.id,
          name: product.name,
          descripcion: product.descripcion,
          price: product.price,
        }))
      );
  }

  getProductsByCategory(idCategory: string): Observable<any> {
    console.log('22');

    return this.http.get(
      `${this.baseLocalUrl}/products/products-by-category/${idCategory}`
    );
  }

  getProducts(pagination:PaginationFront): Observable<IDomainRequestProduct[]> {
    return this.http
      .get<IApiResponseProduct[]>(`${this.baseLocalUrl}/products?limit=${pagination.limit}&page=${pagination.page}&categoryId=${pagination.categoryId}`)
      .pipe(
        map((products) =>
          products.map((productApi) => ({
            id: productApi.id,
            name: productApi.name,
            descripcion: productApi.descripcion,
            price: productApi.price,
          }))
        )
      );
  }
}
