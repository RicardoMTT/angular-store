import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from 'src/app/core/services/email.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {

  emailControl:string = '';
  nameControl:string = '';

  isLoading:boolean = false;

  constructor(private emailService:EmailService,
    private toastr: ToastrService){
  }

  sendEmail(){
    this.isLoading = true;
    this.emailService.sendEmail(this.emailControl,'tricardo003@gmail.com','quiero informacion sobre tus productos','tema',this.nameControl).subscribe({
      next: (value) => {
        this.isLoading = false;
        this.toastr.success('Correo enviado correctamente')
        this.emailControl = '';
        this.nameControl = '';
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
