import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './../../shared/task';
import { Project } from './../../shared/project';
import { Comment } from './../../shared/comment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TodoService } from './../../todo.service';
import * as $ from 'jquery';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {

  @Input() project: Project;
  @Input() task: Task;
  @Input() modalRef: BsModalRef;
  comments: Comment[];
  uploadFile: String
  message: String = '';
  attachment: String = '';
  errors: String;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getComments(this.project, this.task)
                    .subscribe( comments => this.comments = comments,
                                err => this.errors = err );
  }

  changeUploadName(el){
    this.uploadFile = el.value.replace(/\\/g, '/').replace(/.*\//, '').substring(0, 17);
  }

  onSubmit(el, form){
    if(this.uploadFile){
      var reader = new FileReader();
      reader.readAsDataURL(el.files[0]);
      reader.onload = () => {
        el.value = '';
        this.uploadFile = '';
        this.createComment(form, reader.result);
      };
    }else{
      this.createComment(form);
    }
  }

  delete(comment: Comment){
    this.todoService.deleteComment(this.project, this.task, comment)
                    .subscribe(res => {
                      this.task.numberOfComments--;
                      this.comments = this.comments.filter(p => p.id != comment.id);
                    }, err => this.errors = err);
  }

  private createComment(form, attachment: String = ''){
    this.todoService.createComment(this.project, this.task, this.message, attachment)
                    .subscribe( comment => {
                      form.reset();
                      this.comments.unshift(comment);
                      this.task.numberOfComments++;
                    }, err => this.errors = err);
  }
}
