import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-capture-order',
  templateUrl: './capture-order.component.html',
  styleUrls: ['./capture-order.component.scss']
})
export class CaptureOrderComponent {

  constructor(private route:ActivatedRoute,private cartService:CartService){
    const token = this.route.snapshot.queryParamMap.get('token');
    console.log(token); 
    this.captureOrder(token);
  }

  captureOrder(token:any){
    this.cartService.captureOrder(token).subscribe({
      next:(response:any)=>{
        console.log(response);
      },
      error: (err)=> {
        console.log(err);
        
      },
    })
  }
}
