import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { RegisterComponent } from "./components/auth/register/register.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { WorkItemGridComponent } from "./components/layout/work-item-grid/work-item-grid.component";

const routes: Route[] = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
      path: 'layout',
      component: LayoutComponent,
      children: [
        { path: '', redirectTo: 'workItemGrid', pathMatch: 'full' },
        { path: 'workItemGrid', component: WorkItemGridComponent }
      ]
    },
    { path: '', redirectTo: 'layout', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];


@NgModule( {
    imports: [ RouterModule.forRoot(routes) ],
    exports: [RouterModule]
})
export class AppRoutesModule { }

