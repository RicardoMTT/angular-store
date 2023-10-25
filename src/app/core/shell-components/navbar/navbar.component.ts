import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, filter } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  data:any;
  currentRoute: any;
  quantity: any;
  showList:boolean = false;
  searchForm: FormGroup;
  @ViewChild('dropdownList') dropdownList!: ElementRef;
  @ViewChild('toggleButton') toggleButton!: ElementRef;

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
  isMenuOpen: boolean = false;
  constructor(
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductsService,
    private authService:AuthService,
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click',(e:Event)=>{
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      /**
       * Si el click no es en el boton y el click tampoco es dentro del la lista desplegable, entonces se oculta la lista
       */
      if(!this.toggleButton.nativeElement.contains(e.target) && !this.dropdownList?.nativeElement.contains(e.target)) {
          this.showList=false;
      }
  });

    this.searchForm = this.fb.group({
      term: ['', []],
    });
    this.currentRoute = this.router.url;
    this.cartService.cartPublic.subscribe({
      next: (data) => {
        this.quantity = data.totalItems;
      },
    });

    this.authService.userPublic.subscribe({
      next: (data) => {
        console.log('data',data.user.name);
        this.data = data.user.name;
        console.log(this.data);

      }
    })
  }
  onFocus() {
    this.isSubmited = false;
    this.searchInput.nativeElement.select();
  }
  onBlurInputSearch(){
    this.items = [];
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

  toggleDropdown() {
    console.log('aca');

    this.showList = !this.showList;
  }

}
