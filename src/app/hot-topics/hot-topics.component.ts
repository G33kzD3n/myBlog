import { Component, OnInit } from '@angular/core';
import { HotTopicsService } from './hot-topics.service';

@Component({
  selector: 'app-hot-topics',
  templateUrl: './hot-topics.component.html',
  styleUrls: ['./hot-topics.component.scss']
})
export class HotTopicsComponent implements OnInit {
  posts: any = [];
  basePath = "";
  loggedIn = false;
  constructor(public hotTopicsService: HotTopicsService) { }

  ngOnInit() {
    if (!localStorage.getItem('userId')) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
      this.loadHotTopics();
    }

  }
  loadHotTopics() {
    this.hotTopicsService.getHotTopics()
      .subscribe(
        res => {
          this.posts = res.data;
          this.basePath = res.picture_path;
        }
      )
  }
}
