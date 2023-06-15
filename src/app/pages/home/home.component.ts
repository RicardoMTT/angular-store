import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/cart.service';
import { ProductsService } from 'src/app/core/products.service';

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
    private router: Router,
    private cartService:CartService
  ) {
    console.log('a');
    this.isSelected = true;
  }

  ngOnInit() {
    this.productsService.getProducts();
    this.products$ = this.productsService.productsPublic;
    this.categories$ = this.productsService.getCategories();
  }

  selectCategory(category : any) {
    console.log(category);
    
    if (category != null || category != undefined) {
      this.isSelected = true;
      this.idSelected = category;
    } else {
      this.isSelected = true;
      this.idSelected = '3';
    }
    this.productsService.getProductsByCategory(category);
  }

  seeDetails(productId : any) {
    this.router.navigate(['/product-details', productId]);
  }
  addToCart(product : any) {
    console.log(product);
    this.cartService.addToCart(product);
  }
}
