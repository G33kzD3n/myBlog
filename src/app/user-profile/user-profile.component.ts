import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { UserProfileService } from './user-profile.service';
import { FollowerService } from '../posts/service/follower.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  public avatar: any = null;
  privacy: boolean = false;
  user: any = [];
  updated = false;
  basePath = null;
  follower = 0;
  loggedInUserId: string = '';
  loggedIn: Boolean = false;
  myFollowers: any = [];
  followingTo: any = [];
  follow_btn_name: string = "Follow";
  showFollowers: Boolean = true;
  showFollowing: Boolean = false;
  viewers: any = [];
  checked: boolean = true;
  activity = {
    posts: 0,
    followers: 0,
    following: 0
  };
  interval: any;
  paramStatus = "";
  canSee: Boolean = false;
  constructor(public ar: ActivatedRoute, private profileService: UserProfileService, public followerService: FollowerService, public router: Router, public fb: FormBuilder) {
  }

  init() {
    this.ar.queryParams.subscribe(
      param => {
        if ('updatedprofile' == param.status) {
          this.paramStatus = 'updatedprofile';
          this.loggedIn = true;
          this.refreshProfile();
        }
        if ('updateprivacy' == param.status) {
          this.paramStatus = 'updateprivacy';
          this.paramStatus = null;
          this.avatar = null;
          this.loggedIn = true;
          this.updated = true;
          this.showProfile(localStorage.getItem('userId'));
        }
        if ('nothingupdated' == param.status) {
          this.paramStatus = null;
          this.avatar = null;
          this.loggedIn = true;
          this.updated = true;
          this.showProfile(localStorage.getItem('userId'));
        }
      }
    );
    this.ar.params.subscribe(
      (routeParam) => {
        if (routeParam.id != localStorage.getItem('userId')) {
          this.router.navigate(['/users/' + routeParam.id]);
          this.showProfile(routeParam.id);
        }
        if (routeParam.id == localStorage.getItem('userId')) {
          this.router.navigate(['/users/' + routeParam.id]);
          this.loggedIn = true;
          this.showProfile(routeParam.id);
        }
      }
    );
  }

  ngOnInit() {
    const routeParams = this.ar.snapshot.params;
    if (localStorage.getItem('userId')) {
      this.loggedInUserId = localStorage.getItem('userId');
      this.loggedIn == true;
    } else {
      this.loggedIn == false;
      return this.router.navigate(['posts']);
    }
    this.init();
  }


  showProfile(userId) {
    if (localStorage.getItem('userId')) {
      this.loggedIn = true;
    }

    this.profileService.getProfile(userId)
      .subscribe(
        res => {
          this.follower = res.follower;
          this.basePath = res.url_base_path;
          this.user = res.user[0];
          this.privacy = this.user.privacy;
          clearInterval(this.interval);

        }, err => {
          clearInterval(this.interval);
          this.router.navigate(['/posts']);
        }, () => {
          if (this.user.id == localStorage.getItem('userId')) {
            //this.canSee = false;
            this.getPrivacyList(userId).subscribe(
              (res: any) => {
                this.followingTo = res[0].following;
                this.myFollowers = res[0].followers;
                this.basePath = res.base_url;
              });
            this.counter(null);
          } else {
            this.counter(this.user.id);
            if (this.user.privacy == false) {
              this.getPrivacyList(userId).subscribe(
                (res: any) => {
                  this.canSee = true;
                  this.basePath = res.base_url;
                  this.followingTo = res[0].following;
                  this.myFollowers = res[0].followers;
                });
            } else {
              this.getPrivacyList(userId).subscribe(
                (res: any) => {
                  this.followingTo = res[0].following;
                  this.myFollowers = res[0].followers;
                  this.basePath = res.base_url;
                  this.setProfileVisibility(this.myFollowers, this.followingTo);
                }, err => {
                  console.log(err);
                });
            }
          }
        });
  }

  showActivity(userId = null) {
    this.profileService.getActivity(userId)
      .subscribe(
        res => {
          if (res.activity) {
            this.activity = res.activity;
          }
        }, err => {
          clearInterval(this.interval);
          this.router.navigate(['/posts']);
        },
        () => {
          clearInterval(this.interval);
        }
      );
  }

  follow(toBeFollowedUsersId: number) {
    this.followerService.followToggle(toBeFollowedUsersId)
      .subscribe(
        res => {
          if (this.follow_btn_name == "Following") {
            console.log("name was " + this.follow_btn_name);
            this.follow_btn_name = "Follow";
          } else {
            console.log("name was " + this.follow_btn_name);
            this.follow_btn_name = "Following";
          }
          this.init();
          // console.log(res.data);
          //this.showProfile(toBeFollowedUsersId);
        }, err => {
        }
      );
  }
  getPrivacyList(id): Observable<any> {
    return this.followerService.getPrivacyListById(id);
  }
  setProfileVisibility(followers: any[], following: any[]): any {
    if (this.canFollowersSee(followers) && this.canFollowedSee(following) == false) {
      this.canSee = false;
    }
    if (this.canFollowersSee(followers) || this.canFollowedSee(following) == true) {
      this.canSee = true;
    }
  }
  canFollowedSee(following: any[]): any {
    if (following.some(user => {
      return <string>user.id == localStorage.getItem('userId') && user.canSee == true;
    })) {
      console.log("### is present");
      return true;
    } else {
      console.log("### not present");
      return false;
    }
  }
  canFollowersSee(followers: any[]) {
    if (followers.some(user => {
      return <string>user.id == localStorage.getItem('userId') && user.canSee == true;
    })) {
      return true;
    } else {
      return false;
    }
  }

  counter(userId: any) {
    if (userId == null) {
      this.interval = setInterval(() => {
        this.activity.posts += 1;
        this.activity.following += 1;
        this.activity.followers += 1;
      }, 10);
      setTimeout(() => {
        this.showActivity();
      }, 1);
    } else {
      this.interval = setInterval(() => {
        this.activity.posts += 1;
        this.activity.following += 1;
        this.activity.followers += 1;
      }, 10);
      setTimeout(() => {
        this.showActivity(userId);
      }, 1);
    }
  }
  showFollowingUsers() {
    this.showFollowers = false;
    this.showFollowing = true;
    //const routeParam = this.ar.snapshot.params.id;

  }
  showFollowerUsers() {
    this.showFollowers = true;
    this.showFollowing = false;
  }

  showEditProfileFeature() {
    this.router.navigate(['/users/edit/' + this.loggedInUserId]);
  }

  refreshProfile() {
    if (this.paramStatus = "updatedprofile") {
      this.paramStatus = null;
      this.avatar = null;
      this.router.navigate(['users/' + localStorage.getItem('userId')]);
      this.showProfile(localStorage.getItem('userId'));
    }
  }

}
