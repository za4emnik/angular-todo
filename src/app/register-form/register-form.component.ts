import { Component, Output, EventEmitter } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { Router } from '@angular/router';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.sass']
})
export class RegisterFormComponent {

  constructor(private router: Router, private tokenAuthSerivce:Angular2TokenService) { }

  signUpUser = {
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: ''
  };

  onSignUpSubmit(){

    this.tokenAuthSerivce.registerAccount(this.signUpUser)
                         .subscribe( res => { if(res.status == 200) this.router.navigate(['/']) },
                                     err => this.signUpUser.errors = err.json().errors.full_messages );
  }
}
