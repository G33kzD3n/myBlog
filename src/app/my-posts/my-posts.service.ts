import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyPostsService {

  constructor(public http: HttpClient) { }

  getMyPosts() {
    let userId = localStorage.getItem('userId');
    console.log('http://localhost:9100/posts?user=' + userId);
    return this.http.get('http://localhost:9100/posts?user=' + userId);
  }
}
