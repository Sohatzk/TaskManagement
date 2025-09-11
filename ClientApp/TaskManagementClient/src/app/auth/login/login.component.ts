import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authService';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginModel } from '../../models/auth/out/loginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authFailed: boolean = false;
  loggedIn: boolean = false;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    cookieService: CookieService) {
      const cookie = cookieService.get('user-info');
      if (cookie && cookie != '') {
        this.loggedIn = true;
      }
  }

  ngOnInit(): void {
    this.authFailed = false;
    this.loginForm = this.formBuilder.group(
      {
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(10)]],
          rememberMe: [false]
      });
  }

  public logIn(): void {
    console.log(this.loginForm.controls['password'].errors);
    if (!this.loginForm.valid) {
        return;
    }
    const loginModel = new LoginModel(
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value,
      this.loginForm.get('rememberMe')?.value);


    this.authService.logIn(loginModel).subscribe(
      {
        next: (_isLoggedIn) => {
            this.router.navigateByUrl('users');
        },
        error: (err) => {
          if (!err?.error?.isSuccess) {
            this.authFailed = true;
          }
        }
      });
  }

  navigateToRegistration(): void {
    this.router.navigateByUrl('register');
  }
}
