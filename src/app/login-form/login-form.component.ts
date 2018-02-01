import { Component, Output, EventEmitter } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent {

  constructor(private router: Router, private tokenAuthSerivce:Angular2TokenService) { }

  signInUser = {
    email: '',
    password: '',
    errors: ''
  };

  onSignInSubmit(){
    this.tokenAuthSerivce.signIn(this.signInUser)
                        .subscribe(res => { if(res.status == 200) this.router.navigate(['/']) },
                                   err => this.signInUser.errors = "Incorrect login or(and) password.")
  }
}
