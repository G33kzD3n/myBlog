import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from "@angular/forms";
import { PostService } from '../posts/service/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PostDetailService } from '../post-detail/post-detail.service';




@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']

})
export class PostComponent implements OnInit {
  public heading = "Create a new post.";
  postForm: FormGroup;
  public file: any = null;
  post: any;
  edited: Boolean = false;
  published: Boolean = false;
  constructor(public fb: FormBuilder,
    public postService: PostService, public router: Router, public ar: ActivatedRoute, public postDetailService: PostDetailService) {

  }

  ngOnInit() {
    if (!localStorage.getItem('username')) {
      this.router.navigate(['posts']);
    }
    this.postForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      body: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    });

    //if edit route was browsed.
    const routeParams = this.ar.snapshot.params;
    console.log(routeParams.id);
    if (routeParams.id) {
      console.log('inisde edit');
      this.heading = "Edit your post here.";
      this.editPost(routeParams.id);
      return;
    }
  }

  fileUpload(event) {
    console.log(event);
    this.file = event.target.files[0];
  }

  postBlog(post: any) {
    if (this.edited) {
      this.updatePost(this.ar.snapshot.params.id);
      return;
    }

    let payload = new FormData();
    if (this.file == null) {
      payload.append('file', null, null);
      payload.append('title', post.controls['title'].value);
      payload.append('body', post.controls['body'].value);
      payload.append('username', localStorage.getItem('username'));
    } else {
      payload.append('file', this.file, this.file.name);
      payload.append('title', post.controls['title'].value);
      payload.append('body', post.controls['body'].value);
      payload.append('username', localStorage.getItem('username'));
    }
    this.postService.savePost(payload)
      .subscribe(
        result => {
          console.log("on new post" + result.status);
          if (result.status) {
            this.published = true;
            console.log('success');
            this.router.navigate(['posts'], { queryParams: { status: "published" } });
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  editPost(postId) {
    this.edited = true;
    console.log(postId + "to be commented");
    this.postDetailService.getPost(postId)
      .subscribe(
        result => {
          this.post = result.post;
          //bind form with previous values;
          this.postForm.controls['title'].setValue(this.post[0].title);
          this.postForm.controls['body'].setValue(this.post[0].body);
          this.file = null;
        },
        error => {
          console.log(error);
        });
    console.log('from edit form ' + postId);
  }

  updatePost(postId: number) {
    let payload = new FormData();
    if (this.file == null) {
      payload.append('file', null, null);
      payload.append('title', this.postForm.controls['title'].value);
      payload.append('body', this.postForm.controls['body'].value);
      payload.append('username', localStorage.getItem('username'));
      console.log('null ');
    } else {
      console.log("********file already");
      console.log(this.file);
      payload.append('file', this.file, this.file.name);
      payload.append('title', this.postForm.controls['title'].value);
      payload.append('body', this.postForm.controls['body'].value);
      payload.append('username', localStorage.getItem('username'));
    }

    console.log(payload);
    this.postService.updatePost(postId, payload)
      .subscribe(
        res => {
          if (res.status === "success") {
            this.router.navigate(['posts/' + postId]);
          }
        }, err => {
          console.log(err);
        }
      );
  }
  // like(postId){
  //   this.likeElem.like(postId);
  // }
}
