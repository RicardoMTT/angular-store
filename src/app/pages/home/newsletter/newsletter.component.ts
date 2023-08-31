import { Component } from '@angular/core';
import { EmailService } from 'src/app/core/services/email.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {

  emailControl:string = '';
  constructor(private emailService:EmailService){

  }

  sendEmail(){
    this.emailService.sendEmail(this.emailControl,'tricardo003@gmail.com','quiero informacion sobre tus productos','tema').subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
