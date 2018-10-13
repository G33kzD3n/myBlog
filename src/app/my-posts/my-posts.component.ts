import { Component, OnInit } from '@angular/core';
import { MyPostsService } from './my-posts.service';
import { LikesService } from '../likes/likes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  posts: any[] = [];
  myFollowersPosts: any[] = [];
  basePath: string;
  message: string = null;
  username: string;
  loggedIn = false;

  constructor(public myPostsService: MyPostsService, public likesService: LikesService, public router: Router) { }

  ngOnInit() {
    this.username = "";
    if (localStorage.getItem('username')) {
      this.loggedIn = true;
      this.username = localStorage.getItem('username');
      this.loadMyPosts();
    } else {
      this.router.navigate(['posts']);
    }

  }
  loadMyPosts() {
    this.myPostsService.getMyPosts()
      .subscribe(
        (res: any) => {
          this.basePath = res.picture_path;
          this.posts = res.posts;
          console.log(res);

        }, err => {
          console.log(err);
        }
      );
  }

  like(index) {
    this.likesService.likeToggle(this.posts[index][0].id, localStorage.getItem('username')).subscribe(
      res => {
        this.posts[index].total = res.likes_count;
        this.loadMyPosts();
      }
    );
  }
}

