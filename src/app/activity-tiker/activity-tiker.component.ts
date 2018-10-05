import { Component, OnInit } from '@angular/core';
import { FollowerService } from '../posts/service/follower.service';
import { ActivityTikerService } from './activity-tiker.service';

@Component({
  selector: 'app-activity-tiker',
  templateUrl: './activity-tiker.component.html',
  styleUrls: ['./activity-tiker.component.css']
})
export class ActivityTikerComponent implements OnInit {
  username: string;
  loggedIn: Boolean = false;
  activities: any = [];
  length: boolean = false;
  basePath: "";
  constructor(public activityTikerService: ActivityTikerService) { }

  ngOnInit() {
    this.username = "";
    if (localStorage.getItem('username')) {
      this.loggedIn = true;
      this.username = localStorage.getItem('username');
      // this.showActivity();
    }
    // this.showActivity();
    // setInterval(() => {
    this.showActivity();
    // }, 10000);
  }
  showActivity() {
    const userId = localStorage.getItem('userId');
    this.activityTikerService.getActivity(userId)
      .subscribe(
        res => {
          if (res.activities != 0) {
            this.length = true;
            this.activities = res.activities;
            this.basePath = res.avatar_base_path;
          }
        }
      );

  }
}
