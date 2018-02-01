import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { TodosComponent } from './todos/todos.component';
import { CanActivate } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { TodosGuardService } from './todos-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: TodosComponent, canActivate: [TodosGuardService] },
  { path: 'signin', component: LoginFormComponent, canActivate: [AuthGuardService] },
  { path: 'signup', component: RegisterFormComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
