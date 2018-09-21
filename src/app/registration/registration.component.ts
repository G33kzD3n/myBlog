import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regForm: FormGroup;
  heading = "Singn Up";
  disableSignUp = true;
  constructor(public fb: FormBuilder, public regService: RegistrationService, public router: Router) { }

  ngOnInit() {
    this.regForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      authorName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    });
  }

  checkUsername(regForm) {
    let username = this.regForm.controls['authorName'].value;
    this.regService.checkUsername(username)
      .subscribe(
        res => {
          if (res == '1') {
            this.disableSignUp = true;
            console.log("form server" + res);
            this.regForm.controls['authorName'].setErrors({ taken: "username name already taken." });
          }
          else {
            this.disableSignUp = false;
          }
        }
      );
  }
  regUser(regForm) {
    this.regService.registerUser(regForm.value)
      .subscribe(
        res => {
          if (res.status == "created") {
            console.log(res.user);
            localStorage.setItem('username', res.user.username);
            localStorage.setItem('userId', res.user.id);
            this.router.navigate(['posts'], { queryParams: { status: "newuser" } });
          }
        }
      );
  }

}
