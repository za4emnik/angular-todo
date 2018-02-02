import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Comment } from './../../../shared/comment';

@Component({
  selector: 'comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.sass']
})
export class CommentItemComponent implements OnInit {

  @Input() comment: Comment;
  @Output() deleteItem: EventEmitter<Comment> = new EventEmitter();
  created_at: String;

  constructor() { }

  ngOnInit() {}

  onDelete(){
    this.deleteItem.emit(this.comment);
  }



}
