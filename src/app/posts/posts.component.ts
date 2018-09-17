import { Component, OnInit} from '@angular/core';
import { PostService } from './service/post.service';
import { LikesService } from '../likes/likes.service';
import { FollowerService } from './service/follower.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts:any[]=[];
  myFollowersPosts :any[]=[];
  basePath:string;
  username:string ;
  loggedIn :Boolean = false;
  constructor(
    public postService:PostService, private likesService: LikesService, private followerService :FollowerService) { }

  ngOnInit() {
    this.username="";
    console.log("wlcomr to posts");
    if(localStorage.getItem('username')){
      this.loggedIn=true;
      this.username = localStorage.getItem('username');
    }
    this.loadPosts();
  }
  loadPosts(){
    this.postService.getPosts()
    .subscribe(
        res => {
          this.posts = res.data;
         console.log(res);
          this.basePath = res.picture_path;

        },
        error=>{
          console.log(JSON.parse(error._body));
    });
  }
  like(index){
     this.likesService.likeToggle(this.posts[index][0].id,localStorage.getItem('username')).subscribe(
       res => {
        this.posts[index].total = res.likes_count;
       }
     );
  }

}
