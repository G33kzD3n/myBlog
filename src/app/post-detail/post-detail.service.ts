import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostDetailService {

  constructor(public http :HttpClient ) { }

  getPost(id:number): Observable <any>{
    console.log('http://localhost:9100/posts/view/'+id);
    return this.http.get('http://localhost:9100/posts/view/'+id);

  }
}
