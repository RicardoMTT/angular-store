import { Component } from '@angular/core'; 
import { LocationService } from './core/services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'store-angular';
  constructor(public locationService:LocationService){
    console.log('aaa');
    this.locationService.getLocation().subscribe({
      next: (response) => {
        console.log(response);
      }
    })
  }
}
