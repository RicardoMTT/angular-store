import { Observable } from "rxjs";
import { IDomainRequestCategory } from "../domain/category.model";

export interface ICategoryApiService {
	getCategories(): Observable<IDomainRequestCategory[]>;   
 
}
