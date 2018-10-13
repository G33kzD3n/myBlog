import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDetailService } from '../post-detail/post-detail.service';
import { CommentsService } from './comments.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StorecommentService } from '../storecomment/storecomment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  public comments = [];
  public show: Boolean = true;
  public username: string;
  public posts: any;
  public loggedIn: Boolean = false;
  public editCommentId = 0;
  commentForm: FormGroup;
  published: Boolean = false;
  routeParams: number;
  noMoreComments: Boolean;
  next: number = 0;

  constructor(public ar: ActivatedRoute, public commentsService: CommentsService, public fb: FormBuilder,
    private storeCommentService: StorecommentService, public router: Router) {
    this.next = 0;
    this.noMoreComments = false;
  }

  ngOnInit() {
    this.routeParams = this.ar.snapshot.params.id;
    this.username = localStorage.getItem('username');
    if (this.username) {
      console.log(this.username);
      this.loggedIn = true;
      this.commentForm = this.fb.group({
        body: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      });
    }
    this.commentsService.getComments(this.routeParams, this.next)
      .subscribe(
        result => {
          console.log(result);
          this.comments = result.comments;
        },
        error => {
          console.log(error);
        });
  }

  loadPreviousComments(value) {
    const routeParams = this.ar.snapshot.params;
    this.next += 2;
    this.commentsService.getComments(routeParams.id, this.next)
      .subscribe(
        result => {
          console.log(result);
          this.comments = this.comments.concat(result.comments);
          console.log(this.comments.length);
        },
        error => {
          console.log(error);
        });
  }


  editComment(comment: string, commentId: number) {
    this.editCommentId = commentId;
    this.show = false;
    this.commentForm.controls['body'].setValue(comment);
    console.log(comment);
  }

  publishComment(comment: any) {
    console.log(this.editCommentId);
    if (this.editCommentId > 0) {
      this.updateComment(comment);
      return;
    }
    let postId = this.ar.snapshot.params.id;
    let payload = {
      body: comment.controls['body'].value,
      username: localStorage.getItem('username')
    };
    //console.log(payload);
    this.storeCommentService.storeComment(postId, payload)
      .subscribe(
        result => {
          console.log(result);
          if (result.status === "success") {
            this.published = true;
            this.ngOnInit();
            // this.router.navigate(['posts/'+postId]);
          }
        },
        error => {
          console.log(error);
        }
      );

  }

  updateComment(comment: string) {
    comment = this.commentForm.controls['body'].value;
    this.commentsService.updateComment(this.editCommentId, comment)
      .subscribe(

        res => {
          console.log(res);
          this.ngOnInit();
        }
      );
  }
}
