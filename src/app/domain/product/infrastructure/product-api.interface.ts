import { Observable } from "rxjs";
import { IDomainRequestProduct } from "../domain/product.model";
import { PaginationFront } from "./product-api.service";

export interface IProductApiService {
	getProducts(pagination:PaginationFront): Observable<IDomainRequestProduct[]>;

	getProductsByCategory(idCategory: string): Observable<any>;

	getProductById(idProduct:any):Observable<IDomainRequestProduct>;
}
