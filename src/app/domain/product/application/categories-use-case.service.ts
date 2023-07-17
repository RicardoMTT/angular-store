import { Inject, Injectable } from "@angular/core";
import { ICategoryApiService } from "../infrastructure/category-api.interface";
import { HTTP_CATEGORY_SERVICE } from "../infrastructure/providers/category-api.provider";

@Injectable({ providedIn: 'root' })
export class CategoriesUseCaseService {
    constructor(@Inject(HTTP_CATEGORY_SERVICE) private _CategoryApiService: ICategoryApiService) {}

    getCategories()  {        
		  return this._CategoryApiService.getCategories();
	}
}