import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class StorecommentService {

  constructor(public http: HttpClient, public app: AppService) { }

  storeComment(postId: number, payload: any): Observable<any> {
    return this.http.post(this.app.baseUrl + '/comments/store/' + postId, payload);
  }
}
