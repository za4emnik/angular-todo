import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { Task } from './../../../shared/task';
import { Project } from './../../../shared/project';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.sass']
})
export class TaskItemComponent implements OnInit {

  @Input() project: Project;
  @Input() task: Task;
  @Output() onComplete: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateDeadline: EventEmitter<Task> = new EventEmitter();
  @Output() onDelete: EventEmitter<Task> = new EventEmitter();
  @Output() onMoveUp: EventEmitter<Task> = new EventEmitter();
  @Output() onMoveDown: EventEmitter<Task> = new EventEmitter();

  temporaryDate: Date;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.temporaryDate = this.task.deadline;
  }

  completeTask(completed){
    this.task.aasm_state = completed ? 'completed' : 'in_process';
    this.onComplete.emit(this.task);
  }

  deleteTask(){
    this.onDelete.emit(this.task)
  }

  onCloseDeadlineModal(){
    this.task.deadline = this.temporaryDate;
  }

  isTaskExpired(){
    return this.task.aasm_state == "in_process" && Date.now() > this.task.deadline.getTime();
  }
}
