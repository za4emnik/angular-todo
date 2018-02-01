import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from './../../shared/project';
import { Task } from './../../shared/task';
import { TodoService } from './../../todo.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class TasksComponent implements OnInit {

  @Input() project: Project;
  @Output() onCompleteProject: EventEmitter<Project> = new EventEmitter();
  tasks: Task[];
  numberOfComments: Object = new Object();
  errors: String;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTasks(this.project).subscribe(tasks => {
      tasks.map(el => el.deadline = new Date(el.deadline));
      tasks.forEach(el => this.commentsCount(el));
      this.tasks = tasks;
    }, err => this.errors = err);
  }

  createTask(name: string){
    this.todoService.createTask(this.project, name)
                    .subscribe(task => {
                                 task.deadline = new Date(task.deadline);
                                 this.tasks.push(task);
                               }, err => this.errors = err);
  }

  complete(task: Task){
    this.updateTask(task, 'editTask', true);
  }

  delete(task: Task){
    this.todoService.deleteTask(this.project, task)
                    .subscribe(res => this.tasks = this.tasks.filter(p => p.id != task.id),
                               err => this.errors = err);
  }

  onEditSubmit(task: Task){
    this.updateTask(task);
  }

  updateDeadline(task: Task){
    this.updateTask(task);
  }

  moveUp(task: Task){
    this.updateTask(task, 'moveUpTask');
  }


  moveDown(task: Task){
    this.updateTask(task, 'moveDownTask');
  }

  private commentsCount(task: Task){
    this.todoService.getComments(this.project, task)
                    .subscribe( comments => task.numberOfComments = comments.length,
                                err => this.errors = err );
  }

  private updateTask(task: Task, action='editTask', completed=false){
    let index = this.tasks.indexOf(task);
    this.todoService[action](this.project, task).subscribe(task => {
      let tempTask: Task = task;
      tempTask.deadline = new Date(tempTask.deadline);
      if (action=='editTask'){
        this.tasks[index] = tempTask;
      }else{
        this.sortTasks(tempTask, index, action);
      }
      if(completed) this.onCompleteMessage();
    }, err => this.errors = err);
  }

  private onCompleteMessage(){
    let isCompletedTasks = this.tasks.every(el => el.aasm_state == 'completed' );
    if (isCompletedTasks) this.onCompleteProject.emit(this.project);
  }

  private sortTasks(task: Task, index: number, action: String){
    let position: number = action == 'moveUpTask' ? index-1 : index+1;
    if (position < 0) position = 0;
    this.tasks.splice(index, 1);
    this.tasks.splice(position, 0, task);
  }
}
