import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { debounceTime, filter } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentRoute: any;
  quantity: any;
  searchForm: FormGroup;
  @ViewChild('searchInput') searchInput!: ElementRef;
  items:any[] = [];
  isSubmited: boolean = false;
  /*
  |-------------------------------------------------------
  | Items Navigation
  |-------------------------------------------------------
  | Init position selected item:
  | -1 : none
  | 0 : first
  */
  indexSearchNavigation = -1;
  constructor(
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductsService
  ) {
    this.searchForm = this.fb.group({
      term: ['', []],
    });
    this.currentRoute = this.router.url;
    this.cartService.cartPublic.subscribe({
      next: (data) => {
        this.quantity = data.totalItems;
      },
    });
  }
  onFocus() {
    this.isSubmited = false;
    this.searchInput.nativeElement.select();
  }
  onBlurInputSearch() {
    this.items = [];
    // ------------------------------------------------------------
    // Reset selected item position
    // ------------------------------------------------------------
    // -1 : none
    // 0 : first
    this.indexSearchNavigation = -1;
  }
  ngOnInit(): void {
    this.searchForm
      .get('term')
      ?.valueChanges.pipe(
        debounceTime(400),
        filter((term:string) => term !== null && term.length > 3)
        )
      .subscribe((term) => {
        this.productService.getProductByTerm(term).subscribe({
          next: (data:any) => {
            this.isSubmited = true;
            this.items = data;
            // this.router.navigate(['search']);
          },
        });
      });
  }

  openSidebar() {
    this.cartService.toggleSidebar();
  }

  selectedProduct(item:any,event:any){
    event.preventDefault();
    this.items = [];
    this.searchForm.reset();
    this.router.navigate(['/product-details', item.id]);
  }
}
