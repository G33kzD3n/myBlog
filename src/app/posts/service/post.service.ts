import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public http: HttpClient, public app: AppService) { }

  getPosts(): Observable<any> {
    console.log(this.app.baseUrl + '/posts');
    const data = this.http.get(this.app.baseUrl + '/posts?hasliked=' + localStorage.getItem('userId'));
    return data;
  }

  savePost(post): Observable<any> {
    return this.http.post(this.app.baseUrl + '/posts/store', post);
  }


  updatePost(postId: number, payload: any): Observable<any> {
    return this.http.post(this.app.baseUrl + '/posts/update/' + postId, payload);
  }
}
