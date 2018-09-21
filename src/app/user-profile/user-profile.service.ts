import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(public http: HttpClient) { }

  getProfile(userId:number): Observable<any>{
    let loggedInUserId = localStorage.getItem('userId');
    return this.http.get('http://localhost:9100/users/show/' + userId + '?isfollower=' + loggedInUserId);
  }
}
