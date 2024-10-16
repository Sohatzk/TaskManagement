import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserService } from './services/userService';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppRoutesModule } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { errorInterceptor } from '../error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
  ], 
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutesModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    UserService,
    provideHttpClient(withInterceptors([errorInterceptor]))
  ],  // Register services
  bootstrap: [AppComponent]  // Bootstrap the root component (AppComponent)
})
export class AppModule { }