import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient, public app: AppService) { }

  login(username): Observable<any> {
    return this.http.post(this.app.baseUrl + '/posts/login', username);
  }

  // logout(): Observable<any> {
  //   return Observable.create();
  // }
}
