import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Task } from './../../../shared/task';

@Component({
  selector: 'task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.sass']
})
export class TaskEditFormComponent implements OnInit {

  @Input() task: Task;
  @Output() edit: EventEmitter<Task> = new EventEmitter();
  temporaryTaskName: String;

  constructor() { }

  ngOnInit(){
    this.temporaryTaskName = this.task.name;
  }

  onSubmit(){
    this.edit.emit(this.task);
  }

  onCloseForm(){
    this.task.name = this.temporaryTaskName;
    this.task.editable = false;
  }
}
