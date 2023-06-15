import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public productsPublic = this.products$.asObservable();
  public mockCategories = [
    {
      id:"1",
      nombre:"sport"
    },
    {
      id:"2",
      nombre:"casual"
    }
    ]
  public mockProducts = [
    {
      "id":"1",
      "nombre":"camiseta",
      "price":40,
      "imagen":{
        "url":"asd"
      },
      "descripcion":"lorem impsum",
      "idCategory":"1",
      "quantity":0
    },
    {
      "id":"2",
      "nombre":"zapatilla adidas",
      "price":140,
      "imagen":{
        "url":"aksmdkasmdkas"
      },
      "descripcion":"lorem impsum",
      "idCategory":"1",
      "quantity":0
    },
    {
      "id":"3",
      "nombre":"zapatos simples",
      "price":100,
      "imagen":{
        "url":"aksmdkasmdkas"
      },
      "descripcion":"lorem impsum",
      "idCategory":"2",
      "quantity":0
    },
    {
      "id":"4",
      "nombre":"zapatos negros",
      "price":100,
      "imagen":{
        "url":"aksmdkasmdkas"
      },
      "descripcion":"lorem impsum",
      "idCategory":"2",
      "quantity":0
    }
    ];
  constructor(private http: HttpClient) {
    console.log('constructor auth');
  }

  getProducts(){
    this.products$.next(this.mockProducts)
  }

  getCategories(): Observable<any[]> {
    return of(this.mockCategories)
  }

  getProduct(productId: any) {
    console.log(productId);
    
    let product = this.mockProducts.filter(p => p.id == productId.toString());
    console.log(product);
    
    return of(product);
  }
  getProductsByCategory(idCategory: any) {
    if (idCategory == '3' || idCategory == undefined) {
      this.products$.next(this.mockProducts);
      return;
    }
    console.log(this.mockProducts);
    console.log(idCategory);
    
    let products = this.mockProducts.filter(p => p.idCategory == idCategory.toString())
    console.log(products);
    
    this.products$.next(products);
  }
}
