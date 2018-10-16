import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class HotTopicsService {

  constructor(public http: HttpClient, public app: AppService) { }

  getHotTopics(): Observable<any> {
    return this.http.get(this.app.baseUrl + '/tikers/hotTopics');
  }
}
