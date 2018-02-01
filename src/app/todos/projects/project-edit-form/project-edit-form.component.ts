import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Project } from '../../../shared/project';

@Component({
  selector: 'project-edit-form',
  templateUrl: './project-edit-form.component.html',
  styleUrls: ['./project-edit-form.component.sass']
})
export class ProjectEditFormComponent implements OnInit {

  @Input() project: Project;
  @Output() edit: EventEmitter<Project> = new EventEmitter();
  @Output() close: EventEmitter<Project> = new EventEmitter();
  temporaryProjectName: String;

  constructor() { }

  ngOnInit(){
    this.temporaryProjectName = this.project.name;
  }

  onSubmit(){
    this.edit.emit(this.project);
  }

  onCloseForm(){
    this.project.name = this.temporaryProjectName;
    this.close.emit(this.project);
  }
}
