import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginApiService } from './login-api.interface';
import { IDomainRequestLogin, IApiLoginResponse } from './models/login-api.model';

@Injectable()
export class LoginApiService implements ILoginApiService {
  private baseUrl: string = 'https://api-store-backend-nestjs.onrender.com';
  private baseLocalUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {

  }

  login(loginDto: IDomainRequestLogin): Observable<IApiLoginResponse> {
    return this.http.post<IApiLoginResponse>(
      `${this.baseLocalUrl}/auth/login`,loginDto
    );
  }


}
