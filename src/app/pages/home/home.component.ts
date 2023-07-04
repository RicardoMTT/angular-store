import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isSelected:any;
  idSelected:any;

  products$: Observable<any[]> | undefined;
  categories$: Observable<any[]> | undefined;
  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private router: Router,
    private cartService:CartService
  ) {
    this.isSelected = true;
  }

  ngOnInit() {
    this.productsService.getProducts();
    this.categoryService.index();
    this.products$ = this.productsService.productsPublic;
    this.categories$ = this.categoryService.categoriesPublic
  }

  selectCategory(category : any) {    
    if (category != null || category != undefined) {
      this.isSelected = true;
      this.idSelected = category;
    } else {
      this.isSelected = true;
      this.idSelected = '3';
    }
    if (category === 'all') {
      this.productsService.getProducts();
    }else{
      this.productsService.getProductsByCategory(category);
    }
  }

  seeDetails(product : any) {
    this.cartService.addToCart(product);
    this.router.navigate(['/product-details', product.id]);
    
  }
  addToCart(product : any) {
    console.log(product);
    this.cartService.addToCart(product);
  }
}
