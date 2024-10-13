import { Component } from '@angular/core';
import { AuthService } from '../../services/authService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/auth/out/registerModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  authFailed: boolean = false;
  loggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.authService.isLoggedIn().subscribe(
        isLoggedIn => {
            this.loggedIn = isLoggedIn;
        });
  }

  ngOnInit(): void {
    this.authFailed = false;
    this.registerForm = this.formBuilder.group(
      {
          firstName: [''],
          lastName: [''],
          email: [''],
          password: [''],
          repeatPassword: [''],
          rememberPassword: [ false ]
      });
  }

  public register() {
    if (!this.registerForm.valid) {
        return;
    }
    const registerModel = new RegisterModel(
      this.registerForm.get('firstName')?.value,
      this.registerForm.get('lastName')?.value,
      this.registerForm.get('email')?.value,
      this.registerForm.get('password')?.value,
      this.registerForm.get('repeatPassword')?.value);

      debugger;

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
}
