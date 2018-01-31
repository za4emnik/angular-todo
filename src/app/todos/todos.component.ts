import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Project } from '../shared/project';
import { Angular2TokenService } from "angular2-token";
import { environment } from "../../environments/environment";


@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.sass']
})
export class TodosComponent implements OnInit {

  projects: Project[];
  isCompletedProject: Boolean;
  errors: String;

  constructor(private authToken: Angular2TokenService, private todoService: TodoService) {
    this.authToken.init(environment.token_auth_config);
  }

  ngOnInit(){
    this.todoService.getProjects().subscribe(projects => this.projects = projects,
                                             err => this.errors = err);
  }

  showCompleteMessage(project: Project){
    this.isCompletedProject = true;
  }

  createProject(name: string){
    this.todoService.createProject(name).subscribe(project => this.projects.push(project),
                                                   err => this.errors = err);
  }

  deleteProject(project: Project){
    this.todoService.deleteProject(project).subscribe(res => this.projects = this.projects.filter(p => p.id != project.id),
                                                      err => this.errors = err);
  }

  editProject(project: Project){
    let index = this.projects.indexOf(project);
    this.todoService.editProject(project).subscribe(project => this.projects[index] = project,
                                                    err => this.errors = err);
  }
}
