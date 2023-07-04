import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  currentRoute: any;
  quantity:any;
  searchForm:FormGroup;
  
  constructor(private cartService:CartService, private router:Router,
    private fb:FormBuilder,private productService:ProductsService){
   console.log(this.router.url);
   this.searchForm = this.fb.group({
    term:['',[]]
   })
   this.currentRoute = this.router.url;
    this.cartService.cartPublic.subscribe({
      next: (data) => {
        console.log(data);
        this.quantity = data.totalItems
      }
    })
  }
  ngOnInit(): void {
    this.searchForm.get('term')?.valueChanges.pipe(
      debounceTime(400)
    ).subscribe(term => {
      console.log(term);
      this.productService.getProductByTerm(term).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/search'])
        }
      })
      
    })
  }
}
