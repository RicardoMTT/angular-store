import { Observable } from "rxjs";
import { IDomainRequestProduct, IDomainResponseProduct } from "../domain/product.model";

export interface IProductApiService {
	getProducts(): Observable<IDomainRequestProduct[]>;   

	getProductsByCategory(idCategory: string): Observable<any>;

	getProductById(idProduct:any):Observable<IDomainRequestProduct>;
}
