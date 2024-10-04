import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserService } from '../services/userService';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [AppComponent, UsersComponent], 
  imports: [
    BrowserModule, 
    HttpClientModule 
  ],
  providers: [UserService],  // Register services
  bootstrap: [AppComponent]  // Bootstrap the root component (AppComponent)
})
export class AppModule { }