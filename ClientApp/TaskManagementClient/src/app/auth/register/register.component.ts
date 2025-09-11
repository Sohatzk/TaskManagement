import { Component } from '@angular/core';
import { AuthService } from '../../services/authService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/auth/out/registerModel';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: false
})
export class RegisterComponent {
  registerForm!: FormGroup;
  authFailed: boolean = false;
  loggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService) {
      const cookie = cookieService.get('user-info');
      if (cookie && cookie != '') {
        this.loggedIn = true;
      }
  }

  ngOnInit(): void {
    this.authFailed = false;
    this.registerForm = this.formBuilder.group(
      {
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(10)]],
          repeatPassword: ['', [Validators.required, Validators.minLength(10)]],
          rememberMe: [ false ]
      });
  }

  public register(): void {
    if (!this.registerForm.valid) {
        return;
    }
    const registerModel = new RegisterModel(
      this.registerForm.get('firstName')?.value,
      this.registerForm.get('lastName')?.value,
      this.registerForm.get('email')?.value,
      this.registerForm.get('password')?.value,
      this.registerForm.get('repeatPassword')?.value,
      this.registerForm.get('rememberMe')?.value);

    this.authService.register(registerModel).subscribe(
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

  navigateToLogIn(): void {
    this.router.navigateByUrl('logIn');
  }
}
