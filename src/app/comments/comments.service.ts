import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(public http: HttpClient, public app: AppService) { }

  getComments(postId: number, offset: number): Observable<any> {
    console.log(this.app.baseUrl + "/comments/index/" + postId + "?" + "offset=" + offset);
    return this.http.get(this.app.baseUrl + '/comments/index/' + postId + "?" + "offset=" + offset);
  }

  updateComment(id: number, comment: string): Observable<any> {
    console.log('id was' + id + "and comment message is " + comment);
    return this.http.post(this.app.baseUrl + '/comments/update/' + id, { comment: comment });
  }
}
