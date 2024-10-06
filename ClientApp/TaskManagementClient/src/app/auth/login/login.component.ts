import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authFailed: boolean = false;
  loggedIn: boolean = false;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.authService.isLoggedIn().subscribe(
        isLoggedIn => {
            this.loggedIn = isLoggedIn;
        });
  }

  ngOnInit(): void {
    this.authFailed = false;
    this.loginForm = this.formBuilder.group(
      {
          email: [ '', [Validators.required, Validators.email] ],
          password: [ '', [Validators.required] ],
          rememberPassword: [ false ]
      });
  }

  public logIn() {
    if (!this.loginForm.valid) {
        return;
    }
    const userName = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    
    this.authService.logIn(userName, password).subscribe(
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
