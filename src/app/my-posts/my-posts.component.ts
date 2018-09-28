import { Component, OnInit } from '@angular/core';
import { MyPostsService } from './my-posts.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  posts: any[] = [];
  myFollowersPosts: any[] = [];
  basePath: string;
  message: string = null;
  username: string;
  loggedIn = false;

  constructor(public myPostsService: MyPostsService) { }

  ngOnInit() {
    this.username = "";
    if (localStorage.getItem('username')) {
      this.loggedIn = true;
      this.username = localStorage.getItem('username');
      this.loadMyPosts();
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
}
