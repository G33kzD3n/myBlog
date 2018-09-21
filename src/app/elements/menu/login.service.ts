import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  login(username): Observable<any> {
    return this.http.post('http://localhost:9100/posts/login', username);
  }

  // logout(): Observable<any> {
  //   return Observable.create();
  // }
}
