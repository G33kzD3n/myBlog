import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public loggedIn: Boolean = false;
  public username: string = "";
  loginForm: FormGroup;
  paramStatus = "";
  constructor(public router: Router, public fb: FormBuilder, public loginService: LoginService, public ar: ActivatedRoute) {
    this.ar.queryParams.subscribe(
      (param) => {
        if ('newuser' == param.status) {
          this.paramStatus = 'newuser';
          this.ngOnInit();
        }
      });
  }
  ngOnInit() {
    this.refreshComponent();
    this.loginForm = this.fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    });

    const status = this.ar.snapshot.queryParamMap.has('status');
    console.log("query params where " + status);
    // this.router.onSameUrlNavigation;
    // this.router.navigate(['posts']);


    //console.log(localStorage.getItem('username'));
    if (localStorage.getItem('username')) {
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
          localStorage.setItem('userId', result.user.id);
          this.loggedIn = true;
          this.username = localStorage.getItem('username');
          this.router.navigate(['posts'], { queryParams: { status: "loggedin" } });
        },
        error => {
          console.log(error);
        }
      );
  }

  logout() {
    this.loggedIn = false;
    localStorage.clear();
    this.router.navigate(['posts'], { queryParams: { status: "loggedout" } });
  }

  register() {
    this.router.navigate(['register']);
  }
  refreshComponent() {
    if (this.paramStatus == 'newuser') {
      this.paramStatus = '';
    }
  }
  showProfile() {
    let id = localStorage.getItem('userId');
    this.router.navigate(['users/' + id]);
  }
}
