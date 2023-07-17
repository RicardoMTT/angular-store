import { BehaviorSubject, Observable, map, of } from 'rxjs';
import {
  IDomainRequestProduct,
  IDomainResponseProduct,
} from '../domain/product.model';
import { IProductApiService } from './product-api.interface';
import { HttpClient } from '@angular/common/http';
import { IApiResponseProduct } from './models/product-api.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductApiService implements IProductApiService {
  //Aca podria ir los behaivourSubject

  private products$: BehaviorSubject<IApiResponseProduct[]> =
    new BehaviorSubject<IApiResponseProduct[]>([]);
  public productsPublic = this.products$.asObservable();

  constructor(private http: HttpClient) {}

  getProductById(idProduct: any): Observable<IDomainRequestProduct> {
    return this.http
      .get<IDomainResponseProduct>(
        'http://localhost:3000/products/' + idProduct
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
    return this.http.get(
      `http://localhost:3000/products/products-by-category/${idCategory}`
    );
  }

  getProducts(): Observable<IDomainRequestProduct[]> {
    return this.http
      .get<IApiResponseProduct[]>('http://localhost:3000/products')
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
