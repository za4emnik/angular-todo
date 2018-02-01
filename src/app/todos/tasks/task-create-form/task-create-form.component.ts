import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'task-create-form',
  templateUrl: './task-create-form.component.html',
  styleUrls: ['./task-create-form.component.sass']
})
export class TaskCreateFormComponent {

  name: string = '';
  @Output() create: EventEmitter<string> = new EventEmitter();

  constructor() { }

  onSubmit(){
    this.create.emit(this.name);
  }
}
