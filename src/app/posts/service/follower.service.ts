import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  constructor(public http: HttpClient) { }

  followToggle(toBeFollowedUsersId: number): Observable<any> {
    let loggedInUserId = localStorage.getItem('userId');
    return this.http.post('http://localhost:9100/users/follow/' + toBeFollowedUsersId, { userid: loggedInUserId });
  }

  getFollowers(id): Observable<any> {
    return this.http.get('http://localhost:9100/users/followers/' + id);
  }
  getFollowing(id): Observable<any> {
    return this.http.get('http://localhost:9100/users/following/' + id);
  }

  getPrivacyListById(id): Observable<any> {
    // let loggedInUserId = localStorage.getItem('userId');
    return this.http.get('http://localhost:9100/users/privacy/' + id);
  }
  // getOtherUserPrivacyList(id): Observable<any> {
  //   return this.http.get('http://localhost:9100/users/privacy/' + id);
  // }
}
