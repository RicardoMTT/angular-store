import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoriesUseCaseService } from 'src/app/domain/product/application/categories-use-case.service';
import { ProductUseCaseService } from 'src/app/domain/product/application/product-use-case.service';
import { PaginationFront } from 'src/app/domain/product/infrastructure/product-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // INFINITIVE_SCROLL
  currentPage=1;
  itemsPerPage=3;

  isSelected:any;
  idSelected:any = '';
  isSidebarVisible: boolean = false;
  products:any[] = [];

  products$: Subscription | undefined;
  categories$: Observable<any[]> | undefined;
  isLoading: boolean = false;
  enableInfiniteScroll = true;
  category: any;
  categories: any;

  constructor(
    private router: Router,
    private cartService:CartService,
    private productUseCaseService:ProductUseCaseService,
    private categoriesUseCaseService:CategoriesUseCaseService

  ) {
    this.isSelected = true;
  }

  ngOnInit() {
    this.loadProducts();

    this.cartService.sidebarVisible.subscribe((visible: boolean) => {
      this.isSidebarVisible = visible;
    });

     this.categoriesUseCaseService.getCategories().subscribe({
      next: (response) => {
        const categories = response;
        this.categories = response;
        categories.forEach((category:any) =>{
          if (category.name === "general") {
            this.idSelected = category.id;
          }
        })
      }
    });

  }

  loadProducts(){
    this.toggleLoading();
    const pagination:PaginationFront = {
      page:this.currentPage,
      limit:this.itemsPerPage,
      categoryId:4
    }
    this.products$ = this.productUseCaseService.getProducts(pagination).subscribe({
      next: (response) => {
        this.products = response;
        this.enableInfiniteScroll = true;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.toggleLoading();
      }
    });

  }

  toggleLoading = ()=>this.isLoading=!this.isLoading;

  onScroll= ()=>{
    this.currentPage++;
    this.appendData();
   }

  selectCategory(category : any) {
    this.category = category;
    // Detener el evento scrolled temporalmente
    this.enableInfiniteScroll = false;


    if (category != null || category != undefined) {
      this.isSelected = true;
      this.idSelected = category;
    } else {
      this.isSelected = true;
      this.idSelected = '';
    }
    if (category === 4) {
      this.currentPage=1;
      this.itemsPerPage=3;

      const pagination:PaginationFront = {
        page:this.currentPage,
        limit:this.itemsPerPage,
        categoryId:4
      }
      this.productUseCaseService.getProducts(pagination).subscribe({
        next: (response) => {
          this.products = response;
          // Reiniciar el evento scrolled
          this.enableInfiniteScroll = true;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.toggleLoading();
        }
      });
    }else{
      this.currentPage=1;
      this.itemsPerPage=3;

      const pagination:PaginationFront = {
        page:this.currentPage,
        limit:this.itemsPerPage,
        categoryId:category
      }
      this.productUseCaseService.getProducts(pagination).subscribe({
        next: (response) => {
          this.products = response;

        // Reiniciar el evento scrolled
        this.enableInfiniteScroll = true;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.toggleLoading();
        }
      });
    }

  }

  seeDetails(product : any) {
    // this.cartService.addToCart(product);
    this.router.navigate(['/product-details', product.id]);

  }
  addToCart(product : any) {
    // this.cartService.addToCart(product);
  }


  appendData= ()=>{
    this.toggleLoading();
    const pagination:PaginationFront = {
      page:this.currentPage,
      limit:this.itemsPerPage,
      categoryId: this.category ? this.category : 4
    }
    this.productUseCaseService.getProducts(pagination).subscribe({
      next : (response) => {
        this.products = [...this.products,...response];
        this.enableInfiniteScroll = true;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.toggleLoading();
      }
    })
  }
}
