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

  constructor(private http: HttpClient) {
  }

  getProducts(){    
    this.http.get(`${this.baseUrl}/product`).subscribe({
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
    this.http.get(`${this.baseUrl}/product/products-by-category/${idCategory}`).subscribe({
      next: (response:any) => {
        if (response) {
          this.products$.next(response.product)   
        }
      }
    });



    // if (idCategory == '3' || idCategory == undefined) {
    //   this.products$.next(this.mockProducts);
    //   return;
    // }
    
    // this.products$.subscribe({
    //   next: (response) => {
    //     let products = response.filter(p => p.idCategory == idCategory.toString())
    //     console.log(products);
        
    //     this.products$.next(products);
    //   }
    // })
    
  }

  getProductById(idProduct:any){
    return this.http.get(`${this.baseUrl}/products/`+idProduct);
  }

  
  getProductByTerm(term:any){
    return this.http.get(`${this.baseUrl}/product/products-by-term/`+term);
  }
  
}
