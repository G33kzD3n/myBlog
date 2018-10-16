import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(public http: HttpClient, public app: AppService) { }

  likeToggle(postId: number, username: string): Observable<any> {
    let payload = {
      post_id: postId,
      id: localStorage.getItem('userId')
    };
    return this.http.post(this.app.baseUrl + '/likes/like', payload);
  }
}
