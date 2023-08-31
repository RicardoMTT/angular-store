import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public productsPublic = this.products$.asObservable();
  private baseUrl: string = 'https://api-store-backend-nestjs.onrender.com';
  private localBaseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getProducts(){
    this.http.get(`${this.localBaseUrl}/product`).subscribe({
      next: (response:any) => {
        if (response) {
          this.products$.next(response.products)
        }
      }
    });
  }

  getProductsByCategory(idCategory: any) {
    const params = new HttpParams();
    params.set('idCategory', idCategory);
    this.http.get(`${this.localBaseUrl}/product/products-by-category/${idCategory}`).subscribe({
      next: (response:any) => {
        if (response) {
          this.products$.next(response.product)
        }
      }
    });
  }

  getProductById(idProduct:any){
    return this.http.get(`${this.localBaseUrl}/products/`+idProduct);
  }

  getProductByTerm(term:any){
    return this.http.get(`${this.localBaseUrl}/products/products-by-term/`+term);
  }

}
