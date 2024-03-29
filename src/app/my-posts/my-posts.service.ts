import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class MyPostsService {

  constructor(public http: HttpClient, public app: AppService) { }

  getMyPosts() {
    let userId = localStorage.getItem('userId');
    console.log(this.app.baseUrl + '/posts?user=' + userId);
    return this.http.get(this.app.baseUrl + '/posts?user=' + userId);
  }
}
