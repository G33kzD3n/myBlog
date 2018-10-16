import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityTikerService {

  constructor(private http: HttpClient, public app: AppService) { }
  getPostTikers(userId: any): Observable<any> {
    return this.http.get(this.app.baseUrl + '/tikers/posttikers/' + userId);
  }
  getActivity(userId: any): Observable<any> {
    return this.http.get(this.app.baseUrl + '/tikers/activity/' + userId);
  }
}
