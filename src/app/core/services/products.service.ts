import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public productsPublic = this.products$.asObservable();
  private baseUrl: string = 'https://api-store-backend-nestjs.onrender.com';
  private localBaseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProducts() {
    this.http.get(`${this.localBaseUrl}/product`).subscribe({
      next: (response: any) => {
        if (response) {
          this.products$.next(response.products);
        }
      },
    });
  }

  getProductsByCategory(idCategory: any) {
    const params = new HttpParams();
    params.set('idCategory', idCategory);
    this.http
      .get(`${this.localBaseUrl}/product/products-by-category/${idCategory}`)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.products$.next(response.product);
          }
        },
      });
  }

  getProductById(idProduct: any) {
    return this.http.get(`${this.localBaseUrl}/products/` + idProduct);
  }

  getProductByTerm(term: any) {
    return this.http.get(
      `${this.localBaseUrl}/products/products-by-term/` + term
    );
  }

  private totalItems = 100;

  getItems(page = 1, itemsPerPage = 10): Observable<string[]> {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const items = [];
    for (let i = startIndex; i < endIndex; i++) {
      if (i < this.totalItems) {
        items.push(`Item ${i + 1}`);
      }
    }
    return of(items).pipe(delay(500));
  }
}
