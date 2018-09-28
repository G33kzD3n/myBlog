import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(public http: HttpClient) { }

  getProfile(userId: number): Observable<any> {
    let loggedInUserId = localStorage.getItem('userId');
    return this.http.get('http://localhost:9100/users/show/' + userId + '?isfollowedby=' + loggedInUserId);
  }
  getActivity(userId = null): Observable<any> {
    let loggedInUserId = localStorage.getItem('userId');
    if (userId == null) {
      return this.http.get('http://localhost:9100/users/activity/' + loggedInUserId);
    } else {
      return this.http.get('http://localhost:9100/users/activity/' + userId);
    }

  }
  editProfile(payload): Observable<any> {
    let userId = localStorage.getItem('userId');
    return this.http.post('http://localhost:9100/users/edit/' + userId, payload);
  }
}

