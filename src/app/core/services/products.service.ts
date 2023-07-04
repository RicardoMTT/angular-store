import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public productsPublic = this.products$.asObservable();

  constructor(private http: HttpClient) {
  }

  getProducts(){    
    this.http.get('https://nest-test-railway-production.up.railway.app/product',{
      headers:{
        'Authorization': 'Bearer test1'
      }
    }).subscribe({
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
    console.log(idCategory);
    this.http.get(`https://nest-test-railway-production.up.railway.app/product/products-by-category/${idCategory}`,{
      headers:{
        'Authorization': 'Bearer test1'
      },
      
    }).subscribe({
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
    return this.http.get('https://nest-test-railway-production.up.railway.app/product/'+idProduct,{
      headers:{
        'Authorization': 'Bearer test1'
      }
    });
  }

  
  getProductByTerm(term:any){
    return this.http.get('https://nest-test-railway-production.up.railway.app/product/products-by-term/'+term,{
      headers:{
        'Authorization': 'Bearer test1'
      }
    });
  }
  
}
