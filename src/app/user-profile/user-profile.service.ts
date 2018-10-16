import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(public http: HttpClient, public app: AppService) { }

  getProfile(userId: any): Observable<any> {
    let loggedInUserId = localStorage.getItem('userId');
    return this.http.get(this.app.baseUrl + '/users/show/' + userId + '?isfollowedby=' + loggedInUserId);
  }
  getActivity(userId = null): Observable<any> {
    let loggedInUserId = localStorage.getItem('userId');
    if (userId == null) {
      return this.http.get(this.app.baseUrl + '/users/activity/' + loggedInUserId);
    } else {
      return this.http.get(this.app.baseUrl + '/users/activity/' + userId);
    }

  }
  editProfile(payload): Observable<any> {
    let userId = localStorage.getItem('userId');
    return this.http.post(this.app.baseUrl + '/users/edit/' + userId, payload);
  }
  updatePrivacy(payload: any): Observable<any> {
    let userId = localStorage.getItem('userId');
    return this.http.post(this.app.baseUrl + '/users/updatePrivacy/' + userId, payload);
  }
}

