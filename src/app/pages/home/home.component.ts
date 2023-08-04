import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { CategoriesUseCaseService } from 'src/app/domain/product/application/categories-use-case.service';
import { GetProductByCategoryUseCaseService } from 'src/app/domain/product/application/get-products-by-category';
import { ProductUseCaseService } from 'src/app/domain/product/application/product-use-case.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isSelected:any;
  idSelected:any = '';
  isSidebarVisible: boolean = false;

  products$: Observable<any[]> | undefined;
  categories$: Observable<any[]> | undefined;
  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private router: Router,
    private cartService:CartService,
    private productUseCaseService:ProductUseCaseService,
    private getProductByCategoryUseCaseService:GetProductByCategoryUseCaseService,
    private categoriesUseCaseService:CategoriesUseCaseService

  ) {
    this.isSelected = true;
  }

  ngOnInit() {
    this.products$ = this.productUseCaseService.getProducts();
    this.cartService.sidebarVisible.subscribe((visible: boolean) => {
      this.isSidebarVisible = visible;
    });
    this.categories$ = this.categoriesUseCaseService.getCategories();
  }

  selectCategory(category : any) {
    if (category != null || category != undefined) {
      this.isSelected = true;
      this.idSelected = category;
    } else {
      this.isSelected = true;
      this.idSelected = '';
    }
    if (category === 'all') {
      this.products$ = this.productUseCaseService.getProducts();
    }else{
      this.products$ = this.getProductByCategoryUseCaseService.getProductsByCategory(category);
    }
  }

  seeDetails(product : any) {
    this.cartService.addToCart(product);
    this.router.navigate(['/product-details', product.id]);

  }
  addToCart(product : any) {
    this.cartService.addToCart(product);
  }
}
