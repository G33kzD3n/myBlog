import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from './user-profile.service';
import { FollowerService } from '../posts/service/follower.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = [];
  follower = 0;
  loggedInUserId: string = '';
  loggedIn: Boolean = false;
  myFollowers: {} = [];
  followingTo: {} = [];
  follow_btn_name: string = "Follow";
  showFollowers: Boolean = true;
  showFollowing: Boolean = false;
  activity = {
    posts: 0,
    followers: 0,
    following: 0
  };
  interval: any;
  paramStatus = "";
  constructor(public ar: ActivatedRoute, private profileService: UserProfileService, public followerService: FollowerService, public router: Router) {
    this.ar.queryParams.subscribe(
      param => {
        if ('otheruser' == param.status) {
          this.paramStatus = 'otheruser';
          this.loadOtherUserProfile(this.ar.snapshot.params.id);
        }
      }
    );
  }

  ngOnInit() {
    const routeParams = this.ar.snapshot.params;
    if (localStorage.getItem('userId')) {
      this.loggedInUserId = localStorage.getItem('userId');
      this.loggedIn == true;
    }
    this.showProfile(routeParams.id);
    if (routeParams.id == this.loggedInUserId) {
      this.counter(null);
    } else {
      this.counter(routeParams.id);
    }
  }

  showProfile(userId: number) {
    this.profileService.getProfile(userId)
      .subscribe(
        res => {
          this.follower = res.follower;
          this.user = res.user[0];
          this.getFollowers();
        }, err => {
          console.log(err);
        }
      );
  }
  showActivity(userId = null) {
    // console.log("other user id " + userId);
    this.profileService.getActivity(userId)
      .subscribe(
        res => {
          this.activity = res.activity;
          clearInterval(this.interval);
        }, err => {
          console.log(err);
        },
        () => {
          //clearInterval();
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

  getFollowers() {
    this.showFollowers = true;
    this.showFollowing = false;
    this.followerService.getFollowers()
      .subscribe(
        (res: any) => {
          console.log(res);
          this.myFollowers = res.followers;
        },
        error => {

        }
      );
  }
  getFollowing() {
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

  counter(userId: any) {
    if (userId == null) {
      this.interval = setInterval(() => {
        this.activity.posts += 1;
        this.activity.following += 1;
        this.activity.followers += 1;
      }, 100);
      setTimeout(() => {
        this.showActivity();
      }, 3000);
    } else {
      this.interval = setInterval(() => {
        this.activity.posts += 1;
        this.activity.following += 1;
        this.activity.followers += 1;
      }, 100);
      setTimeout(() => {
        this.showActivity(userId);
      }, 3000);
    }
  }

  loadOtherUserProfile(id: number) {
    if (this.paramStatus == 'otheruser') {
      this.paramStatus = null;
      console.log('user was ' + id);
      this.showProfile(id)
      this.showActivity(id);
      // this.router.navigate(['users/' + id]);
    }
  }
}
