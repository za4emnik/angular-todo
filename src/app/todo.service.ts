import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';
import { environment } from "../environments/environment";

import { Project } from './shared/project';
import { Task } from './shared/task';
import { Comment } from './shared/comment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';﻿

@Injectable()
export class TodoService {

  constructor(private authTokenService: Angular2TokenService){
    this.authTokenService.init(environment.token_auth_config);
  }

  getProjects(): Observable<Project[]>{
    return this.authTokenService.get('api/v1/projects')
                                .map(res => res.json())
                                .catch(this.handleError);
  }

  createProject(name: string): Observable<Project>{
    let project = new Project(name);
    return this.authTokenService.post('api/v1/projects', project)
                                .map(res => res.json())
                                .catch(this.handleError);
  }

  deleteProject(project: Project): Observable<Response>{
    return this.authTokenService.delete('api/v1/projects/' + project.id)
                                .map(res => res.json())
                                .catch(this.handleError);
  }

  editProject(project: Project){
    return this.authTokenService.patch('api/v1/projects/' + project.id, project)
                                .map(res => res.json())
                                .catch(this.handleError);
  }

  getTasks(project: Project): Observable<Task[]>{
    return this.authTokenService.get('api/v1/projects/'+project.id+'/tasks')
                                .map(res => res.json())
                                .catch(this.handleError);
  }

  createTask(project: Project, name: string){
    let task = new Task(name);
    return this.authTokenService.post('api/v1/projects/'+project.id+'/tasks', task)
                                .map(res => res.json())
                                .catch(this.handleError);
  }

  editTask(project: Project, task: Task){
    return this.authTokenService.patch('api/v1/projects/'+project.id+'/tasks/'+task.id, task)
                                .map(res => res.json())
                                .catch(this.handleError);
  }

  deleteTask(project: Project, task: Task){
    return this.authTokenService.delete('api/v1/projects/'+project.id+'/tasks/'+task.id)
                                .map(res => res.json())
                                .catch(this.handleError);
  }

  moveUpTask(project: Project, task: Task){
    return this.authTokenService.patch('api/v1/projects/'+project.id+'/tasks/'+task.id+'/moveup', '')
                                .map(res => res.json())
                                .catch(this.handleError);
  }

  moveDownTask(project: Project, task: Task){
    return this.authTokenService.patch('api/v1/projects/'+project.id+'/tasks/'+task.id+'/movedown', '')
                                .map(res => res.json())
                                .catch(this.handleError);
  }

  getComments(project: Project, task: Task){
    return this.authTokenService.get('api/v1/projects/'+project.id+'/tasks/'+task.id+'/comments')
                                .map(res => res.json())
                                .catch(this.handleError);
  }

  createComment(project: Project, task: Task, message: String, attachment: String){
    let comment = new Comment(message, attachment);
    return this.authTokenService.post('api/v1/projects/'+project.id+'/tasks/'+task.id+'/comments', comment)
                                .map(res => res.json())
                                .catch(this.handleError);
  }

  deleteComment(project: Project, task: Task, comment:Comment){
    return this.authTokenService.delete('api/v1/projects/'+project.id+'/tasks/'+task.id+'/comments/'+comment.id)
                                .map(res => res.json())
                                .catch(this.handleError);
  }

  private handleError(error: any){
    return Observable.throw(error.json().join(', '));
  }
}
