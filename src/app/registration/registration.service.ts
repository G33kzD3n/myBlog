import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(public http: HttpClient, public app: AppService) { }

  registerUser(payload: any): Observable<any> {
    return this.http.post(this.app.baseUrl + '/users/create', payload);
  }
  checkUsername(username: string): Observable<any> {
    return this.http.get(this.app.baseUrl + '/users/checkusername?user=' + username);
  }
}
