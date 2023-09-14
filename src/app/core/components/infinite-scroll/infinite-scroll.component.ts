import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent {
  items:string[]=[];
   isLoading=false;
   currentPage=1;
   itemsPerPage=10;

   toggleLoading = ()=>this.isLoading=!this.isLoading;

   // it will be called when this component gets initialized.
   loadData= ()=>{
     this.toggleLoading();
     this.paginationService.getItems(this.currentPage,this.itemsPerPage).subscribe({
      next:response=>this.items = response,
      error:err=>console.log(err),
      complete:()=>this.toggleLoading()
     })
   }

   // this method will be called on scrolling the page
   appendData= ()=>{
    this.toggleLoading();
    this.paginationService.getItems(this.currentPage,this.itemsPerPage).subscribe({
     next:response=>this.items = [...this.items,...response],
     error:err=>console.log(err),
     complete:()=>this.toggleLoading()
    })
  }

   onScroll= ()=>{
    this.currentPage++;
    this.appendData();
   }


   constructor(private paginationService:ProductsService) {
   }

  ngOnInit(): void {
    this.loadData();
  }
}
