import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  constructor(public http: HttpClient, public app: AppService) { }

  followToggle(toBeFollowedUsersId: number): Observable<any> {
    let loggedInUserId = localStorage.getItem('userId');
    return this.http.post(this.app.baseUrl + '/users/follow/' + toBeFollowedUsersId, { userid: loggedInUserId });
  }

  getFollowers(id): Observable<any> {
    return this.http.get(this.app.baseUrl + '/users/followers/' + id);
  }
  getFollowing(id): Observable<any> {
    return this.http.get(this.app.baseUrl + '/users/following/' + id);
  }

  getPrivacyListById(id): Observable<any> {
    return this.http.get(this.app.baseUrl + '/users/privacy/' + id);
  }
}
