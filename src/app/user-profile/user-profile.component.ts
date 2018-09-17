import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from './user-profile.service';
import { FollowerService } from '../posts/service/follower.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user :{} =[];
  follower = 0;
  loggedInUserId :string='';
  loggedIn :Boolean = false;
  myFollowers : {} =[];
  followingTo :{} =[];
  follow_btn_name :string ="Follow";
  showFollowers :Boolean = true;
  showFollowing :Boolean = false;
  constructor(public ar : ActivatedRoute, private profileService :UserProfileService, public followerService:FollowerService) { }

  ngOnInit() {
    if(localStorage.getItem('userId')){
      this.loggedInUserId = localStorage.getItem('userId');
      this.loggedIn==true;
    }
    const routeParams  = this.ar.snapshot.params;
    this.showProfile(routeParams.id);

  }

  showProfile(userId:number){
    console.log("from profile"+userId);
    this.profileService.getProfile(userId)
    .subscribe(
      res =>{
        console.log('data recioeved');
        console.log(res);
        this.follower = res.follower;
        this.user = res.user[0];
        this.getFollowers();
      }, err=>{
        console.log(err);
      }
    );
  }

  follow(toBeFollowedUsersId: number) {
    this.followerService.followToggle(toBeFollowedUsersId)
      .subscribe(
        res => {
          this.follow_btn_name = "UnFollow";
          console.log(res.data);
          this.ngOnInit();
        }
      );
  }

  getFollowers(){
    this.showFollowers = true;
    this.showFollowing = false;
    this.followerService.getFollowers()
    .subscribe(
      (res:any) =>{
        console.log(res);
        this.myFollowers =res.followers;
      },
      error =>{

      }
    );
  }
  getFollowing(){
    this.showFollowers = false;
    this.showFollowing = true;
    this.followerService.getFollowing()
      .subscribe(
        (res: any) => {
          console.log(res.following_users);
          this.followingTo = res.following_users;
        },
        error => {
        }
      );
  }
}
