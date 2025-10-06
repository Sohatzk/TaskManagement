import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserService } from './services/userService';
import { AppRoutesModule } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { errorInterceptor } from '../error.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterComponent } from "./components/auth/register/register.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { WorkItemGridComponent } from "./components/layout/work-item-grid/work-item-grid.component";
import { WorkItemComponent } from "./components/layout/work-item/work-item.component";
import { MatDialogModule } from "@angular/material/dialog";
import { WorkItemService } from "./services/workItemService";
import { WorkItemTypeComponent } from "./components/helpers/work-item-type/work-item-type.component";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    WorkItemGridComponent,
    WorkItemComponent,
    WorkItemTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    UserService,
    WorkItemService,
    provideHttpClient(withInterceptors([errorInterceptor]))
  ],  // Register services
  bootstrap: [AppComponent]  // Bootstrap the root component (AppComponent)
})
export class AppModule { }
