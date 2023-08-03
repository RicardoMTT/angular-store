import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public categoriesPublic = this.categories$.asObservable();

  constructor(private http: HttpClient) {}
  private baseUrl: string = 'https://api-store-backend-nestjs.onrender.com';

  index() {
    this.http
      .get(`${this.baseUrl}/category`)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.categories$.next(response.categories);
          }
        },
        
      });
  }
}
