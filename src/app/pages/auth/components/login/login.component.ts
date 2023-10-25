import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginUseCaseService } from 'src/app/domain/auth/application/login-use-case.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginFG: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginUseCaseService: LoginUseCaseService,
    private router: Router,
    private authService:AuthService
  ) {
    this.loginFG = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  sendForm() {
    if (this.loginFG.invalid) {
      return;
    }
    const loginJson = {
      email: this.loginFG.get('email')?.value,
      password: this.loginFG.get('password')?.value,
    };
    this.loginUseCaseService.login(loginJson).subscribe({
      next: (response) => {
        if (response) {
          const user = {
            name:response.name,
            email: response.email,
            token: response.token
          }
          localStorage.setItem('user', JSON.stringify(user));
          this.authService.setUser(user);
          this.router.navigate([''])
        }
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
}
