import { Component, OnInit } from '@angular/core';
import { FollowerService } from '../posts/service/follower.service';
import { ActivityTikerService } from '../activity-tiker/activity-tiker.service';

@Component({
  selector: 'app-post-tikers',
  templateUrl: './post-tikers.component.html',
  styleUrls: ['./post-tikers.component.css']
})
export class PostTikersComponent implements OnInit {
  myFollowersPosts: any[] = [];
  username: string;
  loggedIn: Boolean = false;
  constructor(private activityTikerService:ActivityTikerService) { }

  ngOnInit() {
    this.username = "";
    if (localStorage.getItem('username')) {
      // this.loadPostTikers();
      this.loggedIn = true;
      this.username = localStorage.getItem('username');
    }
    // setInterval(() => {
    //   this.loadPostTikers();
    // }, 15000);
  }

  // loadPostTikers() {
  //   let id = localStorage.getItem('userId');
  //   this.activityTikerService.getPostTikers(id)
  //     .subscribe(
  //       res => {
  //         this.myFollowersPosts = res.data;
  //         console.log(res.data);
  //       }
  //     );
  //   }
}
