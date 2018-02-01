import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'task-create-form',
  templateUrl: './task-create-form.component.html',
  styleUrls: ['./task-create-form.component.sass']
})
export class TaskCreateFormComponent {

  @Output() create: EventEmitter<string> = new EventEmitter();
  name: string = '';
  formButtons: Boolean = false;

  constructor() { }

  onSubmit(){
    this.create.emit(this.name);
  }
}
