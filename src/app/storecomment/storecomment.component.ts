import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorecommentService } from './storecomment.service';

@Component({
  selector: 'app-storecomment',
  templateUrl: './storecomment.component.html',
  styleUrls: ['./storecomment.component.css']
})
export class StorecommentComponent implements OnInit {
  commentForm : FormGroup;
  published : Boolean = false;

  constructor(public fb:FormBuilder, public ar :ActivatedRoute, public storeCommentService:StorecommentService,
    public router: Router
  ) {

  }

  ngOnInit() {
    this.commentForm = this.fb.group({
      body: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }
  publishComment(comment:any){
    let postId =  this.ar.snapshot.params.id;
    let payload = {
      body : comment.controls['body'].value,
      username :localStorage.getItem('username')
    };
    //console.log(payload);
    this.storeCommentService.storeComment(postId,payload)
    .subscribe(
      result =>{
        console.log(result);
        if(result.status ==="success"){
          this.published = true;
        }
      },
      error =>{
        console.log(error);
      }
    );

  }

}
