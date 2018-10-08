import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(public http: HttpClient) { }

  likeToggle(postId: number, username: string): Observable<any> {
    let payload = {
      post_id: postId,
      id: localStorage.getItem('userId')
    };
    return this.http.post('http://localhost:9100/likes/like', payload);
  }
}
