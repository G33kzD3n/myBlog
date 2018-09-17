import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(public http:HttpClient) { }

  getComments(postId:number,offset:number) : Observable <any>{
      console.log("http://localhost:9100/comments/index/"+postId+"?"+"offset="+offset);
    return this.http.get('http://localhost:9100/comments/index/' + postId + "?" + "offset=" + offset);
  }

  updateComment(id:number,comment:string): Observable <any>{
    console.log('id was'+ id +"and comment message is "+ comment);
    return this.http.post('http://localhost:9100/comments/update/'+id,{comment:comment});
  }
}
