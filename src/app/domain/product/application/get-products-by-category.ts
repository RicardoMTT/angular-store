import { Inject, Injectable } from "@angular/core";
import { IProductApiService } from "../infrastructure/product-api.interface";
import { HTTP_PRODUCT_SERVICE } from "../infrastructure/providers/product-api.provider";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GetProductByCategoryUseCaseService {
    constructor(@Inject(HTTP_PRODUCT_SERVICE) private _productApiService: IProductApiService) {}

    getProductsByCategory(categoryId:any): Observable<any[]> {
      console.log('111');

		//TODO: aplicar logica
		return this._productApiService.getProductsByCategory(categoryId);
	}
}
