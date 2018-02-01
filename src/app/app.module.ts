import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Angular2TokenService } from 'angular2-token';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionModule } from 'ng2-accordion';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';
import 'bootstrap-timepicker/css/bootstrap-timepicker.min.css';
import 'bootstrap-timepicker/js/bootstrap-timepicker.js';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './auth-guard.service';
import { TodosGuardService } from './todos-guard.service';
import { TodoService } from './todo.service';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { TodosComponent } from './todos/todos.component';
import { ProjectsComponent } from './todos/projects/projects.component';
import { ProjectFormComponent } from './todos/projects/project-form/project-form.component';
import { ProjectEditFormComponent } from './todos/projects/project-edit-form/project-edit-form.component';
import { TasksComponent } from './todos/tasks/tasks.component';
import { TaskCreateFormComponent } from './todos/tasks/task-create-form/task-create-form.component';
import { TaskEditFormComponent } from './todos/tasks/task-edit-form/task-edit-form.component';
import { TaskItemComponent } from './todos/tasks/task-item/task-item.component';
import { CommentsComponent } from './todos/comments/comments.component';
import { CommentItemComponent } from './todos/comments/comment-item/comment-item.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    TodosComponent,
    ProjectsComponent,
    ProjectFormComponent,
    ProjectEditFormComponent,
    TasksComponent,
    TaskCreateFormComponent,
    TaskEditFormComponent,
    TaskItemComponent,
    CommentsComponent,
    CommentItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NKDatetimeModule,
    AccordionModule,
    Angular2FontawesomeModule,
    TimepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    Angular2TokenService,
    AuthGuardService,
    TodosGuardService,
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
