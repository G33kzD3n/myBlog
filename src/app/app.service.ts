import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = "http://blog.me";
  constructor() {
    this.baseUrl = "http://blog.me";
  }
}
