import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface IUser{
  isLoggedIn: boolean;
  user:any;
}

const user:IUser = {
  isLoggedIn:JSON.parse(localStorage.getItem('user') ? 'true' : 'false') ,
  user:JSON.parse(localStorage.getItem('user') ||'{}'),
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private user$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(user);
  public userPublic = this.user$.asObservable();



  constructor(private http: HttpClient) {}

  refreshToken(token:any) {
    return this.http.post('http://localhost:3000/auth/refresh',token);
  }

  clearCart() {
    localStorage.setItem('user', JSON.stringify({}));

    this.user$.next({
      isLoggedIn:false,
      user:{},
    });
  }

  setUser(user:any) {
    this.user$.next(user)
  }
}
