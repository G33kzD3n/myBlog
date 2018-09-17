import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityTikerService {

  constructor(private http: HttpClient ) { }
  getPostTikers(userId: any): Observable<any> {
    return this.http.get('http://localhost:9100/tikers/posttikers/' + userId);
  }
  getActivity(userId: any): Observable<any> {
    return this.http.get('http://localhost:9100/tikers/activity/' + userId);
  }
}
