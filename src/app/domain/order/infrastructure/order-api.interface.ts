import { Observable } from "rxjs";

export interface IOrderApiService {
	createOrder(order:any): Observable<any>;
}
