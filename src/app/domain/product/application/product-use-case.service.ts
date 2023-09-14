import { Inject, Injectable } from "@angular/core";
import { IProductApiService } from "../infrastructure/product-api.interface";
import { HTTP_PRODUCT_SERVICE } from "../infrastructure/providers/product-api.provider";
import { PaginationFront } from "../infrastructure/product-api.service";

@Injectable({ providedIn: 'root' })
export class ProductUseCaseService {
    constructor(@Inject(HTTP_PRODUCT_SERVICE) private _productApiService: IProductApiService) {}

    getProducts(pagination:PaginationFront)  {
		  return this._productApiService.getProducts(pagination);
	}
}
