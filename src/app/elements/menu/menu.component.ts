import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public loggedIn : Boolean = false;
  public username : string ="";
  loginForm: FormGroup;

  constructor(public router: Router, public fb: FormBuilder, public loginService: LoginService,) { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    });

    //console.log(localStorage.getItem('username'));
    if (localStorage.getItem('username')){
       this.loggedIn = true;
       this.username = localStorage.getItem('username');
       this.router.navigate(['posts']);
    }
  }


  attemptLogin(form: any) {
    this.loginService.login(form.controls['username'].value)
      .subscribe(
        result => {
          localStorage.setItem('username', result.user.username);
          localStorage.setItem('userId',result.user.id);
          this.loggedIn = true;
          this.username = localStorage.getItem('username');
          // this.ngOnInit();
        //
          this.router.navigate(['posts']);
        },
        error => {
          console.log(error);
        }
      );
  }

  logout(){
    this.loggedIn =false;
    localStorage.clear();
    this.ngOnInit();
    this.router.navigate(['posts']);
  }
}
