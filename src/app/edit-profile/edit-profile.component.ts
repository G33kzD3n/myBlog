import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { UserProfileService } from '../user-profile/user-profile.service';
import { FollowerService } from '../posts/service/follower.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  visiblityForm: FormGroup;
  allUsers: any = [];
  visiblity: any = [];
  user: any = [];
  basePath = "";
  follower: any;
  privacy: Boolean = false;
  avatar: any = null;
  usersFollowing: any = [];
  followers: any = [];
  loggedInUserId = null;
  hideVisiblityForm = false;
  allowAllClicked = false;
  noFollowers = false;
  noFollowing = false;
  errorMessage = null;
  dropdown_btn_name = "All";
  backup: any = [];
  loggedIn = false;
  constructor(public ar: ActivatedRoute, public router: Router, public fb: FormBuilder, public profileService: UserProfileService, public followerService: FollowerService) {
    this.editProfileForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      profession: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    });
    this.visiblityForm = this.fb.group({
      visiblity: this.fb.array([this.createVisibliltyArray()])
    });
  }

  ngOnInit() {
    const routeParams = this.ar.snapshot.params;
    if (!this.isUserAllowedToVisit(routeParams.id)) {
      this.loggedIn = false;
      return this.redirectToHome();
    }
    this.loggedInUserId = localStorage.getItem('userId');

    if (!this.loggedInUserId) {
      this.loggedIn = false;
      return this.router.navigate(['posts']);
    } else {
      this.loggedIn = true;
    }
    this.getProfile();
  }
  createVisibliltyArray(): FormGroup {
    return this.fb.group({
      id: "",
      followingId: "",
      name: "",
      is: "",
      cansee: 0,
      avatar: "",
      privacy: ""
    });
  }

  getProfile() {
    const id = localStorage.getItem('userId');
    this.hideVisiblityForm = true;
    this.profileService.getProfile(id)
      .subscribe(
        (res: any) => {
          // console.log(res.user[0]);
          this.follower = res.follower;
          this.basePath = res.url_base_path;
          this.user = res.user[0];
          this.privacy = this.user.privacy;
          this.loadPrivacyData(id);
          this.bindDataToProfileForm(this.user);

        }, err => {
          //  console.log(err);
        }
      );
  }
  editProfile(form) {
    let payload = new FormData();
    payload.append('file', this.avatar, this.avatar != null ? this.avatar.name : null);
    payload.append('name', form.controls['name'].value);
    payload.append('profession', form.controls['profession'].value);
    payload.append('email', form.controls['email'].value);
    payload.append('privacy', this.privacy == true ? '1' : '0');
    this.profileService.editProfile(payload)
      .subscribe(
        res => {
          if (res.status == "success") {
            this.router.navigate(['users/' + localStorage.getItem('userId')], { queryParams: { status: 'updatedprofile' } })
          }
          if (res.status == "error") {
            this.router.navigate(['users/' + localStorage.getItem('userId')], { queryParams: { status: 'nothingupdated' } })
          }
        }
      );
  }
  privacyValue(prValue) {
    if (prValue == 'public') {
      this.privacy = false;
    } else {
      this.privacy = true;
    }
  }

  bindDataToProfileForm(user: any) {
    this.editProfileForm.controls['name'].setValue(this.user.name);
    this.editProfileForm.controls['profession'].setValue(this.user.profession);
    this.editProfileForm.controls['email'].setValue(this.user.email);
  }

  restoreContorlArray() {
    const control = <FormArray>this.visiblityForm.controls['visiblity'];
    this.makeArray(control, this.backup);
    console.log("restored array");
  }
  uploadAvtar(event) {
    this.avatar = event.target.files[0];
    // console.log(this.avatar);
  }

  showFollowing() {
    this.dropdown_btn_name = "Following";
    const control = <FormArray>this.visiblityForm.controls['visiblity'];
    while (this.visiblityForm.controls.visiblity.value.length > 1) {
      this.resetVisiblity();
    }
    this.makeUsersFollowingArray(control, this.usersFollowing);
  }
  showFollowers() {
    this.dropdown_btn_name = "Followers";
    const control = <FormArray>this.visiblityForm.controls['visiblity'];
    if (this.followers.length <= 0) {
      this.noFollowers = true;
      control.at(0).get('name').value.setValue('xxx');
    } else {
      this.noFollowers = false;
      while (this.visiblityForm.controls.visiblity.value.length > 1) {
        console.log("asdasdasda");
        this.resetVisiblity();
      }
      this.makeFollowersArray(control, this.followers);
    }
  }
  showAll() {
    this.dropdown_btn_name = "All";
    const control = <FormArray>this.visiblityForm.controls['visiblity'];
    if (this.followers.length > 0 && this.followers.length > 0) {
      while (this.visiblityForm.controls.visiblity.value.length > 1) {
        this.resetVisiblity();
      }
      console.log("@@@@@insiede showall");
      this.makeArray(control, this.allUsers);
    }
  }
  resetVisiblity() {
    const control = <FormArray>this.visiblityForm.controls['visiblity'];
    if (this.visiblityForm.controls.visiblity.value.length > 0) {
      this.visiblityForm.controls.visiblity.value.forEach((element, index) => {
        control.removeAt(index);
      });
    }
  }
  toggleCanSee(index) {
    const control = <FormArray>this.visiblityForm.controls['visiblity'];
    let hasCanSee = control.at(index).get('cansee').value;
    console.log("&&& had value" + hasCanSee);
    control.at(index).get('cansee').setValue(hasCanSee == true ? 0 : 1);
  }

  updatePrivacy() {
    let newPrivacyList = this.visiblityForm.controls.visiblity.value;
    this.profileService.updatePrivacy(newPrivacyList)
      .subscribe(
        res => {
          if (res.status) {
            this.router.navigate(['users/' + localStorage.getItem('userId')], { queryParams: { status: 'updateprivacy' } })
          }
          // console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }

  loadPrivacyData(id) {
    this.followerService.getPrivacyListById(id)
      .subscribe(
        (res: any) => {
          // console.log(res[0]);
          this.usersFollowing = res[0].following;
          this.followers = res[0].followers;
          this.allUsers = this.usersFollowing;
          this.allUsers = this.allUsers.concat(this.removeDuplicates(this.followers));
          if (this.loggedInUserId == id) {
            const control = <FormArray>this.visiblityForm.controls['visiblity'];
            if (this.followers.length > 0 && this.usersFollowing.length > 0) {
              this.noFollowers = false;
              this.noFollowing = false;
              this.makeAllUsersArray(control, this.allUsers);
            }
            if (this.followers.length <= 0) {
              this.noFollowers = true;
              this.makeAllUsersArray(control, this.usersFollowing);
            }
            if (this.usersFollowing.length <= 0) {
              this.noFollowing = true;
              this.makeAllUsersArray(control, this.followers);
            }
          }
        },
        error => {
          //  console.log(error);
        }
      );
  }
  showNoFollowingMessage() {
    this.errorMessage = "No following yet.";
    this.showFollowers();
  }
  showNoFollowerMessage() {
    this.errorMessage = "No follower yet.";
    this.showFollowing();
  }
  removeDuplicates(users) {
    let notInFollowing = [];
    users.map((element) => {
      return element.is != "both" ? notInFollowing.push(element) : "";
    });
    return notInFollowing;
  }
  makeAllUsersArray(control, users) {
    let i = 0;
    for (; i < users.length; i++) {
      control.at(i).get('id').setValue(i);
      control.at(i).get('followingId').setValue(users[i].id);
      control.at(i).get('name').setValue(users[i].name);
      control.at(i).get('cansee').setValue(users[i].canSee == 1 ? 1 : 0);
      control.at(i).get('avatar').setValue(users[i].avatar);
      control.at(i).get('privacy').setValue(users[i].privacy);
      control.at(i).get('is').setValue(users[i].is);
      i < users.length - 1 ? control.push(this.createVisibliltyArray()) : '';
    }
    control.removeAt(i);
    this.backup = this.visiblityForm.controls.visiblity.value;
  }
  makeArray(control, users) {
    let i = 0;
    for (; i < users.length; i++) {
      control.at(i).get('id').setValue(i);
      control.at(i).get('followingId').setValue(users[i].id);
      control.at(i).get('name').setValue(users[i].name);
      control.at(i).get('cansee').setValue(users[i].canSee == 1 ? 1 : 0);
      control.at(i).get('avatar').setValue(users[i].avatar);
      control.at(i).get('privacy').setValue(users[i].privacy);
      control.at(i).get('is').setValue(users[i].is);
      i < users.length - 1 ? control.push(this.createVisibliltyArray()) : '';
    }
    control.removeAt(i);
  }
  makeUsersFollowingArray(control, users) {
    let i = 0;
    for (; i < users.length; i++) {
      control.at(i).get('id').setValue(i);
      control.at(i).get('followingId').setValue(users[i].id);
      control.at(i).get('name').setValue(users[i].name);
      control.at(i).get('cansee').setValue(users[i].canSee == 1 ? 1 : 0);
      control.at(i).get('avatar').setValue(users[i].avatar);
      control.at(i).get('privacy').setValue(users[i].privacy);
      control.at(i).get('is').setValue(users[i].is);
      i < users.length - 1 ? control.push(this.createVisibliltyArray()) : '';
    }
    control.removeAt(i);
  }
  makeFollowersArray(control, users) {
    let i = 0;
    for (; i < users.length; i++) {
      control.at(i).get('id').setValue(i);
      control.at(i).get('followingId').setValue(users[i].id);
      control.at(i).get('name').setValue(users[i].name);
      control.at(i).get('cansee').setValue(users[i].canSee == 1 ? 1 : 0);
      control.at(i).get('avatar').setValue(users[i].avatar);
      control.at(i).get('privacy').setValue(users[i].privacy);
      control.at(i).get('is').setValue(users[i].is);
      i < users.length - 1 ? control.push(this.createVisibliltyArray()) : '';
    }
    control.removeAt(i);
  }
  checkAll() {
    if (this.allowAllClicked) {
      this.allowAllClicked = false;
      const control = <FormArray>this.visiblityForm.controls['visiblity'];
      for (let i = 0; i < this.visiblityForm.controls.visiblity.value.length; i++) {
        control.at(i).get('cansee').setValue(0);
      }
    } else {
      this.allowAllClicked = true;
      const control = <FormArray>this.visiblityForm.controls['visiblity'];
      for (let i = 0; i < this.visiblityForm.controls.visiblity.value.length; i++) {
        control.at(i).get('cansee').setValue(1);
      }
    }

  }
  isUserAllowedToVisit(id) {
    if (id != localStorage.getItem('userId') && localStorage.getItem('userId')) {
      return false;
    }
    return true;
  }
  redirectToViewProfile() {
    return this.router.navigate(['/users/' + localStorage.getItem('userId')]);
  }
  redirectToHome() {
    return this.router.navigate(['/posts']);
  }
}
