import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.sass']
})
export class ProjectFormComponent {

  name: string = '';
  @Output() create: EventEmitter<string> = new EventEmitter();

  constructor() { }

  onSubmit(){
    this.create.emit(this.name);
  }
}
