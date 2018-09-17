import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public http: HttpClient) { }

 getPosts():Observable<any> {
   const data = this.http.get('http://localhost:9100/posts');
   return data;
  }

  savePost(post):Observable <any>{
    return this.http.post('http://localhost:9100/posts/store',post);
  }


  updatePost(postId: number, payload: any): Observable<any>{
    return this.http.post('http://localhost:9100/posts/update/'+postId,payload);
  }
}
