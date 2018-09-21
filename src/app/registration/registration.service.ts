import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(public http: HttpClient) { }

  registerUser(payload: any): Observable<any> {
    return this.http.post('http://localhost:9100/users/create', payload);
  }
  checkUsername(username: string): Observable<any> {
    return this.http.get('http://localhost:9100/users/checkusername?user=' + username);
  }
}
