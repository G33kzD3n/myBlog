import { Component, OnInit } from '@angular/core';
import { PostService } from './service/post.service';
import { LikesService } from '../likes/likes.service';
import { FollowerService } from './service/follower.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  myFollowersPosts: any[] = [];
  basePath: string;
  message: string = null;
  username: string;
  loggedIn = false;
  paramStatus: string;
  constructor(
    public postService: PostService, private likesService: LikesService, private followerService: FollowerService,
    public ar: ActivatedRoute, public router: Router
  ) {
    this.ar.queryParams.subscribe(
      (param) => {
        console.log(param);
        if ('loggedin' == param.status) {
          this.paramStatus = 'loggedin';
          this.ngOnInit();
        }
        if ('loggedout' == param.status) {
          this.paramStatus = 'loggedout';
          this.ngOnInit();
        }
        if ('published' == param.status) {
          this.paramStatus = 'published';
          this.ngOnInit();
        }
        if ('newuser' == param.status) {
          this.paramStatus = 'newuser';
          this.ngOnInit();
        }
      }
    );
  }

  ngOnInit() {
    console.log("loaded posts");
    this.ar.params.subscribe(
      (params) => {
        if (params.id) {
          this.router.navigate(['/posts/' + params.id]);
          console.log("----------" + params);
        }
      });
    this.username = "";
    if (localStorage.getItem('username')) {
      this.loggedIn = true;
      this.username = localStorage.getItem('username');
    }
    this.loadPosts();
    this.refreshComponent();
  }

  loadPosts() {
    this.postService.getPosts()
      .subscribe(
        res => {
          this.posts = res.data;
          console.log(res);
          this.basePath = res.picture_path;

        },
        error => {
          console.log(JSON.parse(error._body));
        });
  }
  like(index) {
    this.likesService.likeToggle(this.posts[index][0].id, localStorage.getItem('username')).subscribe(
      res => {
        this.posts[index].total = res.likes_count;
      }
    );
  }
  refreshComponent() {
    if (this.paramStatus == 'loggedin') {
      this.paramStatus = '';
      this.posts = [];
      this.myFollowersPosts = [];
      this.router.navigate(['posts']);
    }
    if (this.paramStatus == 'loggedout') {
      this.paramStatus = '';
      this.posts = [];
      this.myFollowersPosts = [];
      this.loggedIn = false;
      this.router.navigate(['posts']);
    }
    if (this.paramStatus == 'published') {
      this.paramStatus = '';
      this.posts = [];
      this.message = "Your post was created successfully.";
      this.myFollowersPosts = [];
      this.router.navigate(['posts']);
    }
    if (this.paramStatus == 'newuser') {
      this.paramStatus = '';
      this.posts = [];
      this.message = "Welcome on board";
      this.myFollowersPosts = [];
      this.loggedIn = true;
      this.username = localStorage.getItem('username');
      this.router.navigate(['posts']);
    }
  }
}
