import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { UserProfileService } from './user-profile.service';
import { FollowerService } from '../posts/service/follower.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  public avatar: any = null;
  privacy: boolean = false;
  user: any = [];
  basePath = null;
  follower = 0;
  editMode = false;
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
  constructor(public ar: ActivatedRoute, private profileService: UserProfileService, public followerService: FollowerService, public router: Router, public fb: FormBuilder) {
    this.ar.queryParams.subscribe(
      param => {
        if ('updatedprofile' == param.status) {
          this.paramStatus = 'updatedprofile';
          this.ngOnInit();
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
    }
    this.editProfileForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      profession: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    });
  }

  showProfile(userId: number) {
    this.profileService.getProfile(userId)
      .subscribe(
        res => {
          this.follower = res.follower;
          this.basePath = res.url_base_path;
          this.user = res.user[0];
          //console.log(res);
        }, err => {
          clearInterval(this.interval);
          this.router.navigate(['/posts']);
        }, () => {
          if (this.user.id == localStorage.getItem('userId')) {
            this.counter(null);
            this.getFollowers();
          } else {
            this.counter(this.user.id);
          }

        }
      );
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
          this.follow_btn_name = "UnFollow";
          console.log(res.data);
          this.ngOnInit();
        }, err => {
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

  privacyValue(prValue) {
    if (prValue == 'public') {
      this.privacy = false;
    } else {
      this.privacy = true;
    }
    console.log(prValue + this.privacy);
  }
  uploadAvtar(event) {
    this.avatar = event.target.files[0];
    console.log(this.avatar);
  }
  showEditProfileFeature() {
    this.editMode = true;
    this.editProfileForm.controls['name'].setValue(this.user.name);
    this.editProfileForm.controls['profession'].setValue(this.user.profession);
    this.editProfileForm.controls['email'].setValue(this.user.email);

  }
  editProfile(form) {
    let payload = new FormData();
    payload.append('file', this.avatar, this.avatar != null ? this.avatar.name : null);
    payload.append('name', form.controls['name'].value);
    payload.append('profession', form.controls['profession'].value);
    payload.append('email', form.controls['email'].value);
    payload.append('privacy', this.privacy == true ? "1" : "0");
    this.profileService.editProfile(payload)
      .subscribe(
        res => {
          if (res.status == "success") {
            this.router.navigate(['users/' + localStorage.getItem('userId')], { queryParams: { status: 'updatedprofile' } })
          }
        }
      );
  }
  refreshProfile() {
    if (this.paramStatus = "updatedprofile") {
      this.paramStatus = null;
      this.avatar = null;
      this.editMode = false;
      this.router.navigate(['users/' + localStorage.getItem('userId')]);
    }
  }
}
