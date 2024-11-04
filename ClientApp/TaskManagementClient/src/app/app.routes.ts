import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { UsersComponent } from "./users/users.component";

const routes: Route[] = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'users', component: UsersComponent },
    { path: '**', redirectTo: '/login' } // Wildcard route for a 404 redirect
];


@NgModule( {
    imports: [ RouterModule.forRoot(routes) ],
    exports: [RouterModule]
})
export class AppRoutesModule { }

