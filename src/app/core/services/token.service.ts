import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  setToken(token: string): void {
    console.log('token',token);
    
    localStorage.setItem('authorization', token);
  }

  getToken(): string {
    return localStorage.getItem('authorization') as string;
  }
}
