import { Component } from '@angular/core';
import { LocationService } from './core/services/location.service';
import { TokenService } from './core/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public locationService: LocationService,
    private tokenService: TokenService
  ) {
    const authorization = {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjg4OTQ4MDA3LCJleHAiOjE2ODg5NDgwNTd9.19wERVX-pkyEZ2ynvJsEUP1r67EnxI1W_RGY-yw2KfI',
    };
    this.tokenService.setToken(JSON.stringify(authorization) as string);
    this.locationService.getLocation().subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
