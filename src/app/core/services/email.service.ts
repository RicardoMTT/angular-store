import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  sendEmail(from:string, to:string,description:string,subject:string,name:string){
    const body = {
      from,
      to,
      description,
      subject,
      name
    }
    return this.http.post<any>('http://127.0.0.1:3300/',body)
  }
}
