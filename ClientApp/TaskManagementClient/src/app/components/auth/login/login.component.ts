import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthBaseComponent } from "../authBaseComponent";
import { LoginModel } from "../../../models/auth/out/loginModel";
import { AuthService } from "../../../services/authService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent extends AuthBaseComponent implements OnInit {
  loginForm!: FormGroup;
  authFailed: boolean = false;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    router: Router,
    cookieService: CookieService) {
      super(router, cookieService);
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
    if (!this.loginForm.valid) {
        return;
    }

    const loginModel = new LoginModel(
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value,
      this.loginForm.get('rememberMe')?.value);

    this.isLoading = true;
    this.authService.logIn(loginModel).subscribe(
      {
        next: (_isLoggedIn) => {
          this.isLoading = false;
          this.router.navigateByUrl('layout/work-items');
        },
        error: () => {
          this.isLoading = false;
          this.loggedIn = false;
          this.authFailed = true;
        }
      });
  }
}
