import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {AuthBaseComponent} from "../authBaseComponent";
import { AuthService } from "../../../services/authService";
import { RegisterModel } from "../../../models/auth/out/registerModel";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: false
})
export class RegisterComponent extends AuthBaseComponent implements OnInit {
  registerForm!: FormGroup;
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

    this.isLoading = true;
    this.authService.register(registerModel).subscribe(
      {
        next: (_isLoggedIn) => {
            this.router.navigateByUrl('layout/work-items');
            this.isLoading = false;
        },
        error: () => {
          this.authFailed = true;
          this.isLoading = false;
        }
      });
  }
}
