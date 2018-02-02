import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Project } from '../../shared/project';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent {

  @Input() projects : Project[];
  @Output() delete: EventEmitter<Project> = new EventEmitter();
  @Output() edit: EventEmitter<Project> = new EventEmitter();
  @Output() completeProject: EventEmitter<Project> = new EventEmitter();

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  skipCollapse($event){
    if($event){
      $event.stopPropagation();
      $event.preventDefault();
    }
  }

  onDelete(project: Project){
    this.delete.emit(project);
  }

  onEdit(project: Project){
    project.editable = true;
  }

  onEditSubmit(project: Project){
    project.editable = false;
    this.edit.emit(project);
  }

  closeEditForm(project: Project){
    project.editable = false;
  }
}
