import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class PostDetailService {

  constructor(public http: HttpClient, public app: AppService) { }

  getPost(id: number): Observable<any> {
    console.log(this.app.baseUrl + '/posts/view/' + id);
    return this.http.get(this.app.baseUrl + '/posts/view/' + id);

  }
}
