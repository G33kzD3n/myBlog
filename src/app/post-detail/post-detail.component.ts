import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDetailService } from './post-detail.service';
import { LikesService } from '../likes/likes.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  public post: any = {};
  public likesCount: number;
  public loggedIn: Boolean = false;
  public basePath: string;
  public updated: Boolean = false;
  public username: string = "";
  constructor(public ar: ActivatedRoute, public postDetailService: PostDetailService, private likeService: LikesService,
    public router: Router) { }

  ngOnInit() {
    console.log("loaded post detail");
    const routeParams = this.ar.snapshot.params;
    this.showPost(routeParams.id);
    if (localStorage.getItem('username')) {
      this.loggedIn = true;
      this.username = localStorage.getItem('username');

    }
  }

  showPost(id: number) {
    this.postDetailService.getPost(id)
      .subscribe(
        result => {
          this.post = result.post;
          this.basePath = result.picture_path;
          //console.log(result);
        },
        error => {
          console.log(error);
        });
  }
  like(postId: number) {
    this.likeService.likeToggle(postId, localStorage.getItem('username')).subscribe(
      res => {
        this.post.total_likes = res.likes_count;
      }
    );
  }


  editPost(postId: number) {
    this.router.navigate(['posts/edit/' + postId]);
  }

}
